---
lang: en-US
title: "How easy is drag-and-drop in Compose?"
description: "Article(s) > How easy is drag-and-drop in Compose?"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How easy is drag-and-drop in Compose?"
    - property: og:description
      content: "How easy is drag-and-drop in Compose?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/how-easy-is-drag-and-drop-in-compose.html
prev: /programming/java-android/articles/README.md
date: 2024-12-11
isOriginal: false
author: Mustafa Khaled
cover: https://droidcon.com/wp-content/uploads/2024/12/1_zexRkeCe48fsa66RhC-zcQ-1024x659.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How easy is drag-and-drop in Compose?"
  desc="In Android, whenever you have a drag-and-drop feature, we usually expect that it will be a complex task. To be honest, I agree. However, the drag-and-drop feature is now easier in Compose."
  url="https://droidcon.com/how-easy-is-drag-and-drop-in-compose"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/1_zexRkeCe48fsa66RhC-zcQ-1024x659.webp"/>

![](https://droidcon.com/wp-content/uploads/2024/12/1_zexRkeCe48fsa66RhC-zcQ-1024x659.webp)

In Android, whenever you have a drag-and-drop feature, we usually expect that it will be a complex task. To be honest, I agree. However, the drag-and-drop feature is now easier in Compose.

To make it clear and easy to understand, we will build a Scrum/Kanban board that contains tickets. These tickets should be dragged and dropped into different columns.

In this example, the user can:

1. create a ticket which should be placed on the TODO column by default
2. Using a bottom sheet, the user can add the ticket description, ticket estimation, and tags
3. When the ticket moves to the Done column, a delete option becomes available, allowing the user to remove it from the board.
4. The user can move the ticket from any column to another.

![](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*eh5JJv1Pemz0F7dFTVqWww.gif)

For technical understanding, we are going to have 6 different parts to this article. We are going to talk about each in detail.

- Build the Jetpack Compose UI
- Enable drag feature for TicketCard
- Enable the Drop feature for the Column
- Drag and Drop logic in details(ViewModel)
- UI Customization for Drag and Drop
- Clarify the drag-drop process

---

## Build the Jetpack Compose UI

Starting with the Board UI, as per the screenshot below, we have 3 titled equal columns, where each column can accept a list of tickets.

With the help of the floating button on the bottom right, we can add a new ticket to the board. these new tickets should be added by default to the TODO column(we will discuss it in the **Add/Delete ticket** section).

When the ticket moves to the Done column, a delete IconButton is available to delete the ticket, otherwise we would have an infinite number of tickets in the Done column.

Adding and deleting option opens a BottomSheet, where its content depends on the feature(we will discuss it in the **Add/Delete ticket** section).

![Overview of the Board UI](https://droidcon.com/wp-content/uploads/2024/12/1_yf2X-s5vw-dscMoc6Ox_iw-1024x461.webp)

```kotlin :collapsed-lines title="DragAndDropCompose.kt"
@Composable
fun DragAndDropCompose(
        modifier: Modifier,
        uiState: UiState,
        onNewTicketSubmitted: (BoardTicket) -> Unit,
        onDeleteConfirmed: (BoardTicket) -> Unit,
        onTicketDropped: (BoardTicket, Column) -> Unit
) {
    var showAddTicketDialog by remember { mutableStateOf(false) }
// A Box contains 3 equal weight DragAndDropBox() separated by a VerticalDivider()
    Box(modifier = modifier.fillMaxSize()) {
        Row(
                modifier = Modifier
                        .fillMaxSize()
                        .padding(8.dp)

        ) {
            DragAndDropBox(
                    modifier = Modifier.weight(1f),
                    list = uiState.list.listOne,
                    column = Column.TODO,
                    onTicketDropped = onTicketDropped,
            )
            VerticalDivider()
            DragAndDropBox(
                    modifier = Modifier.weight(1f),
                    list = uiState.list.listTwo,
                    column = Column.IN_PROGRESS,
                    onTicketDropped = onTicketDropped,
            )
            VerticalDivider()
            DragAndDropBox(
                    modifier = Modifier
                            .weight(1f),
                    list = uiState.list.listThree,
                    column = Column.DONE,
                    onTicketDropped = onTicketDropped,
                    onDeleteConfirmed = onDeleteConfirmed
            )
        }


        FloatingActionButton(
                modifier = Modifier
                        .padding(8.dp)
                        .align(Alignment.BottomEnd),
                onClick = {
                    showAddTicketDialog = true
                }
        ) {
            Icon(Icons.Filled.Add, contentDescription = null)
        }
    }


    InputDialog(
            showDialog = showAddTicketDialog,
            estimationsList = uiState.list.estimations,
            tagsList = uiState.list.tags,
            onNewTicketSubmitted = {
                onNewTicketSubmitted(it)
            },
            onDismiss = { showAddTicketDialog = false }
    )
}
```

`DragAndDropCompose()` is the parent content of the composable function. it contains the following:

- A **`modifier`** to customize the UI
- A **`uiState`** holds the state of the UI, it contains the data that should be displayed.
- `onNewTicketSubmitted: (BoardTicket) -> Unit`** is a callback when a new ticket is added to the boardit accepts BoardTicket as a param. BoardTicket is a data class that contains information about each ticket on the board, which we will discuss later.
- `onDeleteConfirmed: (BoardTicket) -> Unit`** is a callback when a ticket deleted from the boa
- `onTicketDropped(BoardTicket, Column) ->Unit`** is a callback when a ticket is dropped to a column. Iaccepts BoardTicket and Column parameters. Where Column is a data class that describes which column is affected.

Another essential component is **`DragAndDropBox()`**

`DragAndDropBox()` accepts 4 required and 1 optional params.

Using state hoisting, we are passing all callbacks to the parent composable function `DragAndDropCompose()`. `DragAndDropBox()` contains a list param, where it contains a list of `List<BoardTicket>`.

---

## Enable drag feature for `TicketCard`

As you may expect, enabling the drag feature should be applied to the ticket. Inside **`DragAndDropBox()`** we have a title on the top and a list of tickets on each column.

**`LazyColumn`** contains a sticky header that holds the column name. **`items(list)`** contains a list of **`BoardTicket`** **`List<BoardTicket>`** which is a data class that describes the ticket.

From each **`BoardTicket`**, we have **`TicketCard`**, which is a composable function that draws the ticket on each column

```kotlin :collapsed-lines
LazyColumn(
        modifier = Modifier
            .fillMaxSize()
    ) {

        stickyHeader {
            Text(
                text = column.name,
                modifier = Modifier
                    .fillMaxWidth()
                    .graphicsLayer {
                        scaleX = scale
                        scaleY = scale
                        transformOrigin = TransformOrigin.Center
                    },
                textAlign = TextAlign.Center,
                fontWeight = titleStyle.value,
            )
        }

        items(list) { boardTicket ->
            if (list.isNotEmpty()) {
                TicketCard(
                    ticket = boardTicket,
                    onDeleteConfirmed = onDeleteConfirmed,
                )
            }
        }
    }
```

To enable the drag feature for **`TicketCard()`** we need to add a modifier extension function **`dragAndDropSource`**. we can enable the drag by enabling a long-press using `onLongPress()`

The main concept behind the drag and drop is to transfer data from the drag part to the target drop part. ***startTransfer()*** is a method that accepts **`DragAndDropTransferData`** that accepts `ClipData`.

`ClipData` could have 5 different types, `PlainText`, `HtmlText`, `Intent`, `Uri`, and `RawUri`.

Since we want the whole object to be transferred from one column to another, we will ClipData.newIntent type with the help of the `Gson` library. The `newIntent()` accepts 2 arguments, a `label` which is a String that usually describes the data to be transferred, and usually, it’s needed for accessibility. the second argument, is the `Intent()`, where it contains the data.

```kotlin collapsed-lines
Modifier
.dragAndDropSource(block = {
                detectTapGestures(
                    onLongPress = {
                        startTransfer(
                            DragAndDropTransferData(
                                clipData = ClipData.newIntent("ticket", Intent().apply {
                                    putExtra(ARG_TICKET, gson.toJson(ticket))
                                })
                            )
                        )
                    }
            })
```

---

## Enable the Drop feature for the Column

After successfully adding the Drag feature, by filling an Intent with the data, now it’s time to receive/accept that data when the drop happened.

The core part behind receiving the data is a `DragAndDropTarget`. It’s an interface where it contains some methods

```kotlin
fun onDrop(event: DragAndDropEvent): Boolean
fun onStarted(event: DragAndDropEvent) = Unit
fun onEntered(event: DragAndDropEvent) = Unit
fun onMoved(event: DragAndDropEvent) = Unit
fun onExited(event: DragAndDropEvent) = Unit
fun onChanged(event: DragAndDropEvent) = Unit
fun onEnded(event: DragAndDropEvent) = Unit
```

We would focus on three of these methods, `onDrop()`, `onEntered()`, `onExited()`, `onEnded()`.

- `onDrop()` is called whenever the item dragged has been dropped on the target.
- `onEntered()` is called whenever the dragged item has entered the target bounds
- `onExited()` is called whenever the dragged item has exited the bounds where the item was placed.

Inside `DragAndBox()` function, we added the implementation of the DragAndroidDropTarget interface.

```kotlin :collapsed-lines title="DragAndDropBox.kt"
@Composable
fun DragAndDropBox(
    modifier: Modifier,
    list: List<BoardTicket>,
    column: Column,
    onTicketDropped: (BoardTicket, Column) -> Unit,
    onDeleteConfirmed: (BoardTicket) -> Unit = {},
) {
    // ......
    // ......
    val dragAndDropTarget = remember {
        object : DragAndDropTarget {
            override fun onDrop(event: DragAndDropEvent): Boolean {
                val data = event.toAndroidDragEvent().clipData.getItemAt(0).intent
                val ticket = gson.fromJson(data.getStringExtra(ARG_TICKET), BoardTicket::class.java)
                onTicketDropped(
                    ticket, column
                )
                return true
            }

            override fun onEntered(event: DragAndDropEvent) {
                super.onEntered(event)
                // .....
                // .....
            }

            override fun onExited(event: DragAndDropEvent) {
                super.onExited(event)
                // .....
                // .....
            }
        }
    }

    Box(
        modifier = modifier
            .fillMaxWidth()
            .padding(8.dp)
            .background(color = backgroundColor)
            .dragAndDropTarget(
                shouldStartDragAndDrop = { event ->
                    event
                        .mimeTypes()
                        .contains(ClipDescription.MIMETYPE_TEXT_INTENT)
                },
                target = dragAndDropTarget
            )
    ) {
        // .....
        // .....
    }
    // .....
}
```

Let’s break down `onDrop()` implementation, to receive the clipData sent, we use `toAndroidDragEvent()` extension function that returns DragEvent where we can extract all the clipData sent. Since we have a single clipData we would use `getItemAt(0).intent`.

```kotlin
val data = event.toAndroidDragEvent().clipData.getItemAt(0).intent
```

After that we would retrieve the intent, we would need the extra sent which contains a serialized JSON

```kotlin
val ticket = gson.fromJson(data.getStringExtra(ARG_TICKET), BoardTicket::class.java)
```

After implementing the interface, we would use another Modifier extension function to make the DragAndDropBox() composable function configured for drag and drop using `Modifier.dragAndDropTarget()`.

Let’s break it down, `dragAndDropTarget` has 2 arguments. First, `shouldStartDragAndDrop` where it describes the type of the event, in this case, we need to make sure that the `dragAndDropTarget` accepts Intent. Second, the `target` is the interface implementation we did earlier.

```kotlin :collapsed-lines
Box(
    modifier = modifier
        .fillMaxWidth()
        .padding(8.dp)
        .background(color = backgroundColor)
        .dragAndDropTarget(
            shouldStartDragAndDrop = { event ->
                event
                    .mimeTypes()
                    .contains(ClipDescription.MIMETYPE_TEXT_INTENT)
            },
            target = dragAndDropTarget
        )
) {
    // .....
    // .....
}
```

---

## Drag and Drop logic in details(ViewModel)

After the discussion about enabling the drag and drop feature for the Composable functions, we need to make it clear how can we handle the business logic to make sure the board acts as a Kanban/Agile board.

We have a viewModel that contains 3 StateFlow for the 3 lists that match 3 columns we have todos, inProgress, and done list. These 3 lists are wrapped in a uiState.

```kotlin :collapsed-lines title="MainViewModel.kt"
class MainViewModel : ViewModel() {
    private val todos = MutableStateFlow<List<BoardTicket>>(emptyList())
    private val inProgress = MutableStateFlow<List<BoardTicket>>(emptyList())
    private val done = MutableStateFlow<List<BoardTicket>>(emptyList())

    private val _uiState = MutableStateFlow<UiState>(
        UiState.Success(
            SuccessState(
                todos.value,
                inProgress.value,
                done.value
            )
        )
    )
    val uiState = _uiState.asStateFlow()
    // .....
    // .....
}
```

There are 3 actions on the board, Add, Delete, and Move. Each action has a method inside the ViewModel. we used State Hoisting when the ticket, was added, deleted, or moved.

```kotlin :collapsed-lines title="DragAndDropCompose.kt"
// Main Composable function
@Composable
fun DragAndDropCompose(
        modifier: Modifier,
        uiState: UiState,
        onNewTicketSubmitted: (BoardTicket) -> Unit,
        onDeleteConfirmed: (BoardTicket) -> Unit,
        onTicketDropped: (BoardTicket, Column) -> Unit
) {
    // .....
    // .....
}


// Activity
class MainActivity : ComponentActivity() {
    private val viewModel: MainViewModel by viewModels()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DDBoardTheme {
                val uiState = viewModel.uiState.collectAsState(MainViewModel.UiState.Loading)
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    DragAndDropCompose(
                        modifier = Modifier.padding(paddingValues = innerPadding),
                        uiState = uiState.value,
                        onTicketDropped = { boardTicket, type ->
                            viewModel.move(boardTicket = boardTicket, to = type)
                        },
                        onNewTicketSubmitted = { viewModel.add(it) },
                        onDeleteConfirmed = { viewModel.delete(it) }
                        )
                }
            }
        }
    }
}
```

As you can see, we are passing the callbacks using state hoisting from the Composable function the Activity to call the proper method on the ViewModel. For example, if we are looking for adding a new ticket, `onNewTicketSubmitted = { viewModel.add(it) }` should be invoked.

We have a data class that contains the business logic of each ticket.

```kotlin title="BoardTicket.kt"
data class BoardTicket(
    val text: String,
    val estimation: String? = null,
    val tag: String? = null,
    val column: Column
)
```

The data class contains `text` that corresponds to the title of the ticket, an `estimation` that corresponds to the estimation of the ticket, a `tag` that categorizes the ticket, and a column which is an enum that describes the column type

```kotlin title="Column.kt"
enum class Column(val columnName: String) {
    TODO("TODO"),
    IN_PROGRESS("In Progress"),
    DONE("Done")
}
```

Let’s break down the add method. when we add a ticket `onNewTicketSubmitted: (BoardTicket) -> Unit` callback passed to the `MainActivity` where we call `{ viewModel.add(it) }`.

Since when we add a ticket it by default is added to the TODO column, that makes it a very straightforward method. We used `+=` operator to add the ticket to the todos List.

```kotlin
fun add(boardTicket: BoardTicket) {
    todos.value += BoardTicket(text = boardTicket.text, estimation = boardTicket.estimation, tag = boardTicket.tag, column =  Column.TODO)
    updateUiState()
}
```

Let’s break down the delete method. when we delete a ticket. we enable ticket deletion only on the done column. that makes it straightforward as well. using `-=` operator, we delete the ticket from the done List.

```kotlin
fun delete(boardTicket: BoardTicket) {
    done.value -= boardTicket
    updateUiState()
}
```

Let’s break down the move method. As we mentioned earlier, any ticket can move from any column to another without restrictions, that is why the signature of the move method contains a BoardTicket instance and a `target` column. The move method is also straightforward, we want to know what is the source and destination columns. Because we would delete the ticket from the source list and add it to the destination list. For example, if we move a ticket from inProgress column to the done column, we will remove it from the inProgress list and it to the done List.

```kotlin
fun move(boardTicket: BoardTicket, target: Column) {
    when (boardTicket.column) {
    Column.DONE -> done.value -= boardTicket
    Column.IN_PROGRESS -> inProgress.value -= boardTicket
    Column.TODO -> todos.value -= boardTicket
    }
    when (target) {
    Column.DONE -> done.value += boardTicket.copy(column = target)
    Column.IN_PROGRESS -> inProgress.value += boardTicket.copy(column = target)
    Column.TODO -> todos.value += boardTicket.copy(column = target)
    }
    updateUiState()
}
```

::: note

we have a method `updateUiState()` that updates the _uiState to update the UI state and reflect the updates happen.

:::

```kotlin
private fun updateUiState() {
    _uiState.value =
        UiState.Success(SuccessState(todos.value, inProgress.value, done.value))
}
```

---

## UI Customization for Drag and Drop

We need to polish the UI to make look great. we are going to polish the following:

- TicketCard UI Customization
- Column UI Customization
- BottomSheet for ticket addition and deletion

### TicketCard UI Customizations

as per the screen below, we have made some UI customization on the TicketCard, the background color and add a delete icon to any ticket on the Done column.

For the background, it’s straightforward, we decide the containerColor of the card using a when statement with column type.

```kotlin :collapsed-lines title="TicketCard.kt"
@Composable
fun TicketCard(
    ticket: BoardTicket,
    onDeleteConfirmed: (BoardTicket) -> Unit
) {
    val showDeleteTicketDialog = remember { mutableStateOf(false) }
    Card(
        // .....
        // .....
        shape = CardDefaults.outlinedShape,
        colors = CardDefaults.cardColors(
            containerColor = when (ticket.column) {
                Column.IN_PROGRESS -> MaterialTheme.colorScheme.onSecondary
                Column.DONE -> MaterialTheme.colorScheme.onTertiary
                Column.TODO -> MaterialTheme.colorScheme.onPrimary
            }
        )
    ) {
        // .....
        // .....
}
```

For the delete icon on the Done TicketCard columns, we also check the type of the ticket, if it’s done we add a delete icon on the top right.

```kotlin :collapsed-lines title="TicketCard"
@Composable
fun TicketCard(
    ticket: BoardTicket,
    onDeleteConfirmed: (BoardTicket) -> Unit
) {
    // .....
    // .....
    Column(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxWidth()
    ) {
        Row {
            Text(
                text = ticket.text,
                modifier = Modifier.weight(1f),
                fontWeight = FontWeight.Bold
            )
            if (ticket.column == Column.DONE) {
                Icon(
                    Icons.Filled.Delete,
                    contentDescription = null,
                    modifier = Modifier
                        .clickable {
                            showDeleteTicketDialog.value = true
                        })
            }
        }

        // .....
        // .....
    }
}
```

#### Column UI Customization

We will do some customization for the Column, in the title and the background of the column.  
Our mission is to make the title scale increase when a ticket enters the column and returns to its original scale when the ticket leaves the column

Also, to change the background color of the column whenever a ticket moves in/out of a specific columns

To achieve that we would need `onEntered()` and `onExited()` callbacks.

For the title scale, we use `animateFloatAsState()` that switches between font-weight and scale based on a `titleStyle` mutableState.

For the background, we use a `backgroundColor` mutableState to switch between 2 colors.

in the `onEntered()`, `onExited()` callback, we will change the color and also change the `FontWeight`, also change the column background.

![](https://miro.medium.com/v2/resize:fit:1200/format:webp/1*phCM9iy6HLA_KahThucMxQ.gif)

```kotlin :collapsed-lines title="DragAndDropBox.kt"
@Composable
fun DragAndDropBox(
    modifier: Modifier,
    list: List<BoardTicket>,
    column: Column,
    onTicketDropped: (BoardTicket, Column) -> Unit,
    onDeleteConfirmed: (BoardTicket) -> Unit = {},
) {
    var backgroundColor by remember { mutableStateOf(Color(0xffE5E4E2)) }
    val titleStyle = remember { mutableStateOf(FontWeight.Normal) }
    val scale by animateFloatAsState(
        if (titleStyle.value == FontWeight.Bold) 1.4f else 1f,
        label = "scale"
    )
    val dragAndDropTarget = remember {
        object : DragAndDropTarget {
            override fun onDrop(event: DragAndDropEvent): Boolean {
                .....
                .....
            }

            override fun onEntered(event: DragAndDropEvent) {
                super.onEntered(event)
                backgroundColor = Color(0xffD3D3D3)
                titleStyle.value = FontWeight.Bold
            }

            override fun onExited(event: DragAndDropEvent) {
                super.onExited(event)
                backgroundColor = Color(0xffE5E4E2)
                titleStyle.value = FontWeight.Normal
            }
        }
    }
    
    .....
    .....

}
```

#### `BottomSheet` for ticket addition and deletion

We will use the bottom sheet twice, for the addition and deletion of a ticket.

For deletion, it’s straightforward, it’s just a bottom sheet with a message and 2 buttons, one responsible for propagating the `onDelete()` to the MainActivity by state hoisting to perform the `viewModel.delete()` method. The second is just to hide the bottom sheet.

For adding a ticket, it’s a detailed bottom sheet, that contains a TextField with a maximum of 100 characters.

the second and third is a single selection component, where the user can select a tag and an estimation for the ticket and two buttons for adding a ticket by propagating `onNewTicketsubmitted()` to call `viewModel.add()` by state hoisting. We are using a `FlowRow` to achieve the single selection.

![](https://droidcon.com/wp-content/uploads/2024/12/1_qwecJahPL-9xw7x_JjSNMA-1024x461.webp)

```kotlin :collapsed-lines title="SingleSelectionSection.kt"
private fun SingleSelectionSection(
    title: String,
    list: List<String>,
    selectedIndex: Int,
    badgeType: BadgeType,
    onItemSelected: (Int) -> Unit = {},
    hasError: Boolean = false
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text(text = title, modifier = Modifier.padding(end = 8.dp))
        FlowRow(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
            list.forEachIndexed { index, text ->
                CardContainer(
                    text = text,
                    isSelected = selectedIndex == index,
                    badgeType = badgeType,
                    onClick = {
                        onItemSelected(index)
                    },
                    hasError = hasError
                )
            }
        }
    }
}
```

we have also multiple mutableStateFlow to remember the selection of the tags, estimation, and color of the single selection component, because we have a validation on the single selection and `TextField`, if the user click on save button without filling all required fields.

![](https://droidcon.com/wp-content/uploads/2024/12/1_ri1OCyUJi2Nm2VmsFz8SWA-1024x461.webp)

You may notice that the mutableStateFlow that saves the value of the chosen value takes `sheetState`.`isVisible` as a param, for example, the reason behind that is to reset the state each time we open the bottom sheet. so old value disappears.

```kotlin :collapsed-lines title="InputDialog"
@Composable
fun InputDialog(
    showDialog: Boolean,
    estimationsList: List<String>,
    tagsList: List<String>,
    onNewTicketSubmitted: (BoardTicket) -> Unit,
    onDismiss: () -> Unit
) {
    val colorScheme = MaterialTheme.colorScheme
    val sheetState = rememberModalBottomSheetState()
    val scope = rememberCoroutineScope()
    var text by remember(sheetState.isVisible) { mutableStateOf("") }
    val selectedEstimationIndex = remember(sheetState.isVisible) { mutableIntStateOf(-1) }
    val textError = remember(sheetState.isVisible)  { mutableStateOf(false) }
    val selectedTagIndex = remember(sheetState.isVisible) { mutableIntStateOf(-1) }
    var supportTextColor by remember { mutableStateOf(colorScheme.onSurface) }
    var estimationError by remember(sheetState.isVisible)  { mutableStateOf(false) }
    var tagError by remember(sheetState.isVisible)  { mutableStateOf(false) }
    if (showDialog) {

        ModalBottomSheet(
            onDismissRequest = {
                onDismiss()
            },
            sheetState = sheetState
        ) {
            Column(modifier = Modifier.padding(horizontal = 24.dp, vertical = 8.dp)) {
                Text(text = "Add a new Ticket", fontWeight = FontWeight.Bold)
                Spacer(modifier = Modifier.height(8.dp))
                TextField(
                    value = text,
                    placeholder = {
                        Text(text = "Write your ticket title/details")
                    },
                    onValueChange = {
                        text = it
                        supportTextColor = if (text.length > 100) {
                            Color.Red
                        } else {
                            colorScheme.onSurface
                        }
                        if (textError.value && it.isNotEmpty()) {
                            textError.value = false
                        }
                    },
                    modifier = Modifier.fillMaxWidth(),
                    supportingText = {
                        Text(
                            text = "${text.length} / 100",
                            textAlign = TextAlign.End,
                            modifier = Modifier.fillMaxWidth(),
                            color = supportTextColor
                        )
                    },
                    colors = TextFieldDefaults.colors(
                        focusedIndicatorColor = Color.Transparent,
                        unfocusedIndicatorColor = Color.Transparent
                    ),
                    isError = textError.value
                )
                Spacer(modifier = Modifier.height(8.dp))
                SingleSelectionSection(
                    title = "Estimation",
                    list = estimationsList,
                    badgeType = BadgeType.ESTIMATION,
                    selectedIndex = selectedEstimationIndex.intValue,
                    onItemSelected = {
                        selectedEstimationIndex.intValue = it
                        estimationError = false
                    },
                    hasError = estimationError
                )
                Spacer(modifier = Modifier.height(8.dp))
                SingleSelectionSection(
                    title = "Tags",
                    list = tagsList,
                    badgeType = BadgeType.TAG,
                    selectedIndex = selectedTagIndex.intValue,
                    onItemSelected = {
                        selectedTagIndex.intValue = it
                        tagError = false
                    },
                    hasError = tagError
                )

                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = {
                    val hasError =
                        text.isEmpty() || selectedTagIndex.intValue == -1 || selectedEstimationIndex.intValue == -1
                    if (hasError) {
                        textError.value = text.isEmpty()
                        estimationError = selectedEstimationIndex.intValue == -1
                        tagError = selectedTagIndex.intValue == -1
                        return@Button
                    }
                    scope.launch {
                        sheetState.hide()

                    }.invokeOnCompletion {
                        if (!sheetState.isVisible) {
                            onDismiss()
                        }
                    }
                    onNewTicketSubmitted(
                        BoardTicket(
                            text = text,
                            estimation = estimationsList\[selectedEstimationIndex.intValue\],
                            tag = tagsList\[selectedTagIndex.intValue\],
                            column = Column.TODO
                        )
                    )


                }, modifier = Modifier.fillMaxWidth()) {
                    Text(text = "Create")
                }
                Spacer(modifier = Modifier.height(8.dp))
            }
        }
    }
}
```

So, that’s it. with a real-life example, we were able to:

- Understand how drag-and-drop API works in compose
- Adapt some UI customization to make it similar to the Agile/Kanban board
- handle the business logic using ViewModel.

You can find the full repository on [GitHub (<FontIcon icon="iconfont icon-github"/>`MustafaKhaled/DragAndDropBoard`)](https://github.com/MustafaKhaled/DragAndDropBoard).

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/how-easy-is-drag-and-drop-in-compose-e66d47ae8e5f)

<SiteInfo
  name="How easy is drag-and-drop in Compose?"
  desc="Drag-and-Drop is straightforward and easy to implement in Jetpack Compose"
  url="https://proandroiddev.com/how-easy-is-drag-and-drop-in-compose-e66d47ae8e5f/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*yf2X-s5vw-dscMoc6Ox_iw.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How easy is drag-and-drop in Compose?",
  "desc": "In Android, whenever you have a drag-and-drop feature, we usually expect that it will be a complex task. To be honest, I agree. However, the drag-and-drop feature is now easier in Compose.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/how-easy-is-drag-and-drop-in-compose.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
