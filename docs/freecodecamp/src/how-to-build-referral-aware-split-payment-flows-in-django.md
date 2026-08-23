---
lang: en-US
title: "How to Build Referral-Aware Split Payment Flows in Django"
description: "Article(s) > How to Build Referral-Aware Split Payment Flows in Django"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Referral-Aware Split Payment Flows in Django"
    - property: og:description
      content: "How to Build Referral-Aware Split Payment Flows in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-referral-aware-split-payment-flows-in-django.html
prev: /programming/py-django/articles/README.md
date: 2026-08-25
isOriginal: false
author:
  - name: Chidozie Managwu
    url: https://freecodecamp.org/news/author/Doxzy/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4e8f9e07-789d-417b-96af-3a41b327d047.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Referral-Aware Split Payment Flows in Django"
  desc="When a product has a single checkout, payment logic is usually simple: charge the user, mark the order as paid, and move on. But once the business model includes a deposit now, a balance later, and re"
  url="https://freecodecamp.org/news/how-to-build-referral-aware-split-payment-flows-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4e8f9e07-789d-417b-96af-3a41b327d047.png"/>

When a product has a single checkout, payment logic is usually simple: charge the user, mark the order as paid, and move on.

But once the business model includes a deposit now, a balance later, and referral or coupon attribution in between, the problem changes completely.

At that point, you're not just collecting money. You're managing a payment workflow.

In this tutorial, I’ll show you how to build a referral-aware split payment flow in Django that:

- tracks Step 2 deposit and balance separately
- supports coupon and partner linkage
- prevents duplicate payment processing
- uses database transactions safely
- keeps referral payouts consistent
- unlocks deliverables only when the workflow is complete

The main idea is simple: treat payment as a state transition, not just a webhook event.

::: note Prerequisites

Before following along, you should already be comfortable with:

- Django models, views, and querysets
- database transactions in Django
- basic webhook concepts
- Python class-based or function-based view patterns
- how payment providers like Stripe or Paystack send event callbacks

You don't need to be an expert in payments, but you should understand how Django talks to the database and how to store state safely.

:::

::: info Project Structure

Here's a simple structure for the parts we need:

```sh title="file structure"
payments/
├── models.py
├── services.py
├── views.py
├── urls.py
└── webhooks.py
```

This separation matters.

- .<VPIcon icon="fa-brands fa-python"/>`models.py` stores the business state
- .<VPIcon icon="fa-brands fa-python"/>`services.py` contains the finalization logic
- .<VPIcon icon="fa-brands fa-python"/>`views.py` handles user-facing payment actions
- .<VPIcon icon="fa-brands fa-python"/>`webhooks.py` receives gateway callbacks
- .<VPIcon icon="fa-brands fa-python"/>`urls.py` connects endpoints

Keeping payment logic out of views makes the system easier to test and much harder to break.

:::

---

## Designing the Data Model

The most important decision is to model the payment stages clearly.

Instead of storing one vague “paid” flag, define the stages your business actually uses. For example:

```py :collapsed-lines
from django.db import models
from django.conf import settings

class Journey(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    deposit_paid = models.BooleanField(default=False)
    balance_paid = models.BooleanField(default=False)
    deliverables_released = models.BooleanField(default=False)
    referral_code = models.CharField(max_length=50, blank=True, default="")
    partner_name = models.CharField(max_length=120, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    STAGE_DEPOSIT = "deposit"
    STAGE_BALANCE = "balance"

    STAGE_CHOICES = [
        (STAGE_DEPOSIT, "Deposit"),
        (STAGE_BALANCE, "Balance"),
    ]

    STATUS_PENDING = "pending"
    STATUS_SUCCEEDED = "succeeded"
    STATUS_FAILED = "failed"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_SUCCEEDED, "Succeeded"),
        (STATUS_FAILED, "Failed"),
    ]

    journey = models.ForeignKey(Journey, on_delete=models.CASCADE, related_name="payments")
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES)
    gateway_reference = models.CharField(max_length=120, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    raw_payload = models.JSONField(null=True, blank=True)
    finalized_at = models.DateTimeField(null=True, blank=True)

class ReferralPayout(models.Model):
    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name="referral_payout")
    partner_name = models.CharField(max_length=120)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
```

This model design gives you a clean separation:

- `Journey` represents the customer’s overall progress
- `Payment` represents each financial event
- `ReferralPayout` represents what the partner earns from that payment

That separation is what keeps the logic manageable.

---

## How Split Payments Work

Split payments usually follow a simple pattern:

1. the customer pays a deposit
2. the system records that deposit
3. a later payment clears the balance
4. the full workflow becomes complete
5. deliverables unlock only after the right stage

The important part is that each payment stage should be explicit.

If you treat the deposit and balance as two different milestones, then:

- discounts can apply to one stage and not the other
- referral attribution can be recorded per stage
- payouts can happen only when the stage is truly completed
- admin users can see the exact status of the workflow

That's much safer than trying to infer meaning from the amount alone.

---

## Finalizing Payments Safely

The finalization logic should live in a service function, not directly inside the webhook view.

Here's a simple example:

```py :collapsed-lines
from django.db import transaction
from django.utils import timezone

def finalize_payment(*, payment):
    with transaction.atomic():
        locked_payment = Payment.objects.select_for_update().select_related("journey").get(pk=payment.pk)

        if locked_payment.status == Payment.STATUS_SUCCEEDED:
            return locked_payment

        locked_payment.status = Payment.STATUS_SUCCEEDED
        locked_payment.finalized_at = timezone.now()
        locked_payment.save(update_fields=["status", "finalized_at"])

        journey = locked_payment.journey

        if locked_payment.stage == Payment.STAGE_DEPOSIT:
            journey.deposit_paid = True
        elif locked_payment.stage == Payment.STAGE_BALANCE:
            journey.balance_paid = True

        if journey.deposit_paid and journey.balance_paid:
            journey.deliverables_released = True

        journey.save(update_fields=["deposit_paid", "balance_paid", "deliverables_released"])

        if journey.referral_code and not hasattr(locked_payment, "referral_payout"):
            ReferralPayout.objects.create(
                payment=locked_payment,
                partner_name=journey.partner_name,
                amount=locked_payment.net_amount * 0.10,
            )

        return locked_payment
```

There are three important ideas here.

First, `transaction.atomic()` makes sure the update happens as one unit.

Second, `select_for_update()` locks the row so two processes don't finalize the same payment at the same time.

Third, the function checks whether the payment was already processed before doing any work.

That gives you a safe and repeatable finalization path.

---

## Handling Webhooks Idempotently

Payment gateways can send the same webhook more than once.

That means your webhook handler must be idempotent, which simply means it can safely run multiple times without creating duplicate records or breaking state.

Here's a clean pattern:

```py :collapsed-lines
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

@csrf_exempt
@require_POST
def payment_webhook(request):
    payload = json.loads(request.body.decode("utf-8"))

    event_type = payload.get("event")
    data = payload.get("data", {})
    reference = data.get("reference")

    if not reference:
        return JsonResponse({"error": "Missing reference"}, status=400)

    if event_type != "charge.success":
        return HttpResponse(status=200)

    payment = Payment.objects.filter(gateway_reference=reference).first()
    if not payment:
        return JsonResponse({"error": "Payment not found"}, status=404)

    finalize_payment(payment=payment)
    return HttpResponse(status=200)
```

This view stays intentionally small.

It doesn't try to decide business rules. It only reads the webhook, finds the payment, and passes it to the service layer.

That makes it much easier to test and debug.

---

## Applying Coupons and Referral Attribution

Coupons and partner codes become tricky when the payment is split across stages.

For example, a coupon might apply only to the deposit. Or it might apply to the balance only. Or it might affect both.

The best solution is to store that rule explicitly.

Here's a simple model for stage-aware coupon logic:

```py
class DiscountCode(models.Model):
    APPLIES_DEPOSIT = "deposit"
    APPLIES_BALANCE = "balance"
    APPLIES_BOTH = "both"

    APPLIES_CHOICES = [
        (APPLIES_DEPOSIT, "Deposit only"),
        (APPLIES_BALANCE, "Balance only"),
        (APPLIES_BOTH, "Both stages"),
    ]

    code = models.CharField(max_length=50, unique=True)
    partner_name = models.CharField(max_length=120, blank=True, default="")
    applies_to = models.CharField(max_length=20, choices=APPLIES_CHOICES, default=APPLIES_BOTH)
    percent_off = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
```

Now your payment flow can check whether the coupon is valid for the current stage before applying it.

A helper function might look like this:

```py
def calculate_discount(amount, coupon, stage):
    if not coupon or not coupon.is_active:
        return 0

    if coupon.applies_to == DiscountCode.APPLIES_DEPOSIT and stage != Payment.STAGE_DEPOSIT:
        return 0

    if coupon.applies_to == DiscountCode.APPLIES_BALANCE and stage != Payment.STAGE_BALANCE:
        return 0

    return amount * (coupon.percent_off / 100)
```

This keeps referral and coupon logic predictable.

---

## Why the Referral Payout Should Be Explicit

A lot of systems accidentally mix these ideas:

- payment received
- coupon applied
- referral credited
- referral paid out

Those aren't the same thing.

A referral code can be attached at checkout, but the actual payout should be created only when the business rules say it's safe.

For example, you might decide:

- the partner gets credited when the deposit is paid
- the payout is created only after the balance clears
- the payout amount is based on the final net payment

That way, you don't pay out early if the customer never completes the full flow.

---

## Unlocking Deliverables at the Right Time

One of the biggest mistakes in split payment systems is unlocking everything after the first payment.

That creates operational problems and trust issues.

A better rule is:

- deposit confirms intent
- balance confirms completion
- deliverables unlock only after the balance is received

You can keep that logic very simple in the `Journey` model:

```py
def update_delivery_state(journey):
    journey.deliverables_released = journey.deposit_paid and journey.balance_paid
    journey.save(update_fields=["deliverables_released"])
```

The logic is readable, testable, and easy for an admin to understand.

---

## Common Mistakes

Here are the mistakes that usually cause trouble in split payment systems:

1. **Using one payment flag for everything**: A single `paid=True` field isn't enough when the business has multiple payment stages.
2. **Letting the webhook write directly to many tables**: That makes the flow hard to test and easy to break. Use a service layer instead.
3. **Forgetting idempotency**: If the gateway retries a webhook, you shouldn't create duplicate payouts or double-update the journey.
4. **Applying coupons without checking the stage**: A code that's valid for the deposit may not be valid for the balance.
5. **Releasing deliverables too early**: Payment received doesn't always mean the workflow is complete.

---

## Conclusion

Referral-aware split payment systems aren't hard because of the payment gateway. They're hard because the business rules are multi-step.

If you want the system to stay reliable, you should:

- model each payment stage explicitly
- store coupon and referral logic separately
- finalize payments inside `transaction.atomic()`
- lock rows with `select_for_update()`
- make webhook handling idempotent
- unlock deliverables only when the full workflow is complete

That approach keeps your Django app honest, traceable, and much easier to maintain as the product grows.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Referral-Aware Split Payment Flows in Django",
  "desc": "When a product has a single checkout, payment logic is usually simple: charge the user, mark the order as paid, and move on. But once the business model includes a deposit now, a balance later, and re",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-referral-aware-split-payment-flows-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
