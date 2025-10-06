---
lang: en-US
title: "How to Build a Public Grafana-based Solar Monitoring Dashboard in Home Assistant"
description: "Article(s) > How to Build a Public Grafana-based Solar Monitoring Dashboard in Home Assistant"
icon: iconfont icon-grafana
category:
  - Go
  - Grafana
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - grafana
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Public Grafana-based Solar Monitoring Dashboard in Home Assistant"
    - property: og:description
      content: "How to Build a Public Grafana-based Solar Monitoring Dashboard in Home Assistant"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-public-grafana-based-solar-monitoring-dashboard-in-home-assistant.html
prev: /programming/go-grafana/articles/README.md
date: 2025-04-17
isOriginal: false
author:
  - name: Daniel Anomfueme
    url : https://freecodecamp.org/news/author/LifeofDan-EL/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744899028552/8ad3f3c4-9b25-473d-b539-14dcb2f2b241.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Grafana > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go-grafana/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Public Grafana-based Solar Monitoring Dashboard in Home Assistant"
  desc="If you have a solar inverter setup, one thing you would agree on with me is that data from your solar inverter setup is really important. Another thing that is also important is having a way to show what your energy generation, consumption, and so on..."
  url="https://freecodecamp.org/news/how-to-build-a-public-grafana-based-solar-monitoring-dashboard-in-home-assistant"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744899028552/8ad3f3c4-9b25-473d-b539-14dcb2f2b241.png"/>

If you have a solar inverter setup, one thing you would agree on with me is that data from your solar inverter setup is really important. Another thing that is also important is having a way to show what your energy generation, consumption, and so on looks like publicly.

The thing is that most solar inverter brands have a form of remote data monitoring platform, from [<VPIcon icon="fas fa-globe"/>Victron’s VRM](https://victronenergy.com/panel-systems-remote-monitoring/vrm) to [<VPIcon icon="fas fa-globe"/>Growatt’s ShineServe](https://en.growatt.com/products/growatt-monitoring-platform)r to [<VPIcon icon="fas fa-globe"/>Deye’s Cloud](https://deyeinverter.com/product/accessory-monitoring-1/smart-pv-management-platform.html), among others. But I’m a fan of self-hosting and local control of data. This is one of the best ways to visualize and showcase all that beautiful data you have publicly to fellow tinkerers, solar inverter users, and the general public without relying on the company’s cloud data logger solution.

In this article, we will be using data available in our Home Assistant setup, sending it to [<VPIcon icon="fas fa-globe"/>InfluxDB](https://influxdata.com/products/influxdb/) and making a [<VPIcon icon="iconfont icon-grafana"/>Grafana](https://grafana.com/oss/grafana/) dashboard out of it. There are a good number of ways to connect your inverter to Home Assistant, depending on the manufacturer. I use a Growatt SPF ES 6000 inverter, and I shared a guide on how to make a local data logger for it that works with Home Assistant [<VPIcon icon="fas fa-globe"/>here](https://hackernoon.com/turn-your-dumb-solar-inverter-into-a-smart-one-with-this-home-assistant-hack).

:: note Prerequisites

- Home Assistant OS
- A domain name
- An inverter connected to your Home Assistant instance

:::

---

## How to Install and Configure InfluxDB

We will be starting by setting up InfluxDB. InfluxDB is an open-source time series database, which differs from the database that [<VPIcon icon="fas fa-glgobe"/>Home Assistant uses by default](https://home-assistant.io/docs/backend/database/#:~:text=The%20default%20database%20used%20is,other%20databases%20can%20be%20used.), SQLite. We will be using InfluxDB v1, as it’s much easier to set up.

Go to your Home Assistant dashboard and go to Settings > Add-ons and click on the Add-On Store.

![A screenshot of Home Assistant Add-ons](https://cdn.hashnode.com/res/hashnode/image/upload/v1744463486874/9dda1fca-24a9-4c30-a486-3b723e8535fe.png)

Inside the Add-on Store, search for “InfluxDB“ and click on the Add-on. You should see the screen below, then install.

![A screenshot of Home Assistant Add-ons, showing InfluxDB Add-on page](https://cdn.hashnode.com/res/hashnode/image/upload/v1744463639772/75f66c35-e7b3-4c20-96ea-9e9154829ac5.png)

Toggle the “Watchdog” on, as this allows the add-on to restart if it crashes. Also, toggle the “show in sidebar” on, which allows you to see the add-on on Home Assistant’s sidebar.

![A screenshot of InfluxDB Add-on installed and some configurations turned on](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465515531/0c9e9475-08c2-4bc3-afe5-baa4fdbae164.png)

Start the add-on and look at the logs to be sure it is working. The “Starting NGINX” is an indicator it’s working.

![A screenshot of InfluxDB Add-on logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465746577/f3adbd52-14cd-4e78-b2d7-789ad2c22b31.png)

Next, go to your Home Assistant sidebar and click on InfluxDB. You need to create a new database to hold your data and also create a new user that has admin privileges to read and write data. Go to the InfluxDB Admin tab.

![A screenshot of InfluxDB Add-on Admin settings showing database available](https://cdn.hashnode.com/res/hashnode/image/upload/v1744466323654/78f21741-e6ca-4094-8fc3-adc563b3dfc1.png)

Click on Create Database - and you can name the database anything you want. I will be naming mine **homeassistant**.

By default, the retention policy for a created database is infinity (which is forever), but you can configure this to be any time frame you want. Retention policy refers to the time frame of data the database can hold. I prefer to stick with infinity as I want to keep as much data as possible and I have enough storage in my Home Assistant hardware for that.

![A screenshot of InfluxDB Add-on Admin settings showing the newly created database available](https://cdn.hashnode.com/res/hashnode/image/upload/v1744466625066/c2ae2012-44d8-4acb-91ae-25ad35fb18ff.png)

Once the database is created, go to the Users tab so you can create the new admin user. Input a username and password for that user and click on Grant Admin, so the permission level can be set to all. I created a new user called **root**.

![A screenshot of InfluxDB Add-on Admin settings showing users available](https://cdn.hashnode.com/res/hashnode/image/upload/v1744467230710/6c025cb7-123a-4552-8090-6a9550e64ecf.png)

At this point, what is left on the InfluxDB side is to tell Home Assistant to start sending sensor data to InfluxDB. You can do this by going to your Home Assistant <VPIcon icon="iconfont icon-yaml"/>`configuration.yaml` file and adding this config below to it. Your host is the IP of your Home Assistant, the port is the default port for the InfluxDB add-on, and the remaining values are based on the values you used during setup.

```yaml title="configuration.yaml"
influxdb:
  host: 192.168.8.12
  port: 8086
  database: homeassistant
  username: root
  password: password
  max_retries: 3
  default_measurement: state
```

Restart your Home Assistant and go to InfluxDB. Click on the Explore tab, and check to see if you have a <VPIcon icon="fas fa-file-lines"/>`database.autogen` file there. Click on it, and if you see some values under Measurements & Tags, you are good to go.

![A screenshot of InfluxDB Add-on Explore tab](https://cdn.hashnode.com/res/hashnode/image/upload/v1744468647521/3082e165-04d9-4b7d-bfd7-8de0662c11a9.png)

---

## How to Install and Configure Grafana

Next on our agenda is to install and configure Grafana. The goal is to have Grafana query InfluxDB and make dashboards based on the queried data.

Go to the Add-on store, search for Grafana, and install it. Remember to toggle on those important settings, then start the add-on.

![A screenshot of Grafana Add-on page](https://cdn.hashnode.com/res/hashnode/image/upload/v1744470196074/b3d69925-9ccc-45b9-8078-905866222d15.png)

Once it has started, click on Grafana on the sidebar. You will arrive at Grafana’s homepage which is where you can create those dashboards.

![A screenshot of Grafana Add-on homepage](https://cdn.hashnode.com/res/hashnode/image/upload/v1744470431232/0e4541a5-344f-4f46-bd85-44f4d92ea53c.png)

But before you do that, you need to connect InfluxDB to Grafana. Navigate to Grafana’s tab >> Connections. You should see an “Add new connection” page. Search for InfluxDB and choose it. Then click on the add new datasource button.

![A screenshot of Grafana Add-on connection settings page](https://cdn.hashnode.com/res/hashnode/image/upload/v1744470636092/8dcb8f2b-7fcd-49d3-80d8-abce4f83ea07.png)

Under HTTP, edit the URL and use **http://ha_ip_address:8086** - don’t omit the `http://` or try to use `localhost` with it. Scroll down to the InfluxDB Details and fill in the data you used while setting up InfluxDB. Then click on Save & Test. If the config is correct, you should see a green tick and text saying “datasource is working…measurements found.”

![A screenshot of Grafana Add-on connection configuration for InfluxDB](https://cdn.hashnode.com/res/hashnode/image/upload/v1744471708830/5b0d0306-8b74-4c02-9163-cc23a7c3425c.png)

---

## How to Create the Grafana Solar Dashboard

With that, you should have InfluxDB running and connected to Grafana. Let’s get to building beautiful dashboards out of all the data being generated. This part is subjective, so you can feel free to edit and modify the design to your taste. We will be using this dashboard [<VPIcon icon="fas fa-globe"/>here](https://helio.openculture.org.ng/public-dashboards/cf813bfa739044129e125bdd65db7a65?ref=blog.openculture.org.ng) as the inspiration for our design.

![A screenshot of a dashboard we want to recreate](https://cdn.hashnode.com/res/hashnode/image/upload/v1744548823070/811cb6b1-d3f6-4880-b665-8af999d4c703.png)

So now go to your Grafana in Home Assistant, click on the + icon and create a new dashboard.

![A screenshot of Grafana homepage](https://cdn.hashnode.com/res/hashnode/image/upload/v1744544792278/0bbc6140-1335-4597-a972-80a5ddee1744.png)

You should know that a dashboard in Grafana refers to the full space and each thing placed on the dashboard is a panel. Each visualization on the dashboard is a panel.


Let’s create a new panel. Pick InfluxDB as the data source, and at the `FROM` row, pick W which is the unit we want to create a visualization from. `WHERE` is entity_id::tag, as that is the way to sort the values by Home Assistant sensor entity name. Then pick the entity id of your panel - mine is `growatt_pv1_charge_power`. You can change the panel title, change the visualization to stat, and add the watt as the unit and the base colour to yellow.
The raw query looks like this:

```sql
SELECT mean("value") FROM "W" WHERE ("entity_id"::tag = 'growatt_pv1_charge_power') AND $timeFilter GROUP BY time($__interval) fill(null)
```

The Grafana edit page looks like this:

![A screenshot of Grafana edit panel view](https://cdn.hashnode.com/res/hashnode/image/upload/v1744550024020/bb50d494-c6bc-45f2-8ff0-17173e7255bc.png)

At this point, you should be able to recreate the remaining parts of the dashboard. But I manually did all that, so you don’t have to go through it all yourself if you don’t want to.

[Here (<VPIcon icon="iconfont icon-github"/>`LifeofDan-EL/Grafana-Solar-Dashboard`)](https://github.com/LifeofDan-EL/Grafana-Solar-Dashboard) is the link to a GitHub repo that has the JSON file of this dashboard. When you go to create a dashboard, you will see an option to import from a JSON file. You can choose to copy and paste or upload the file, whichever works for you.

After importing, you only need to edit each panel through the GUI to use your own entity ID tag in Home Assistant and also the UID of your InfluxDB database.

Here is a picture of my finished result:

![A screenshot of the finished product of the dashboard I built](https://cdn.hashnode.com/res/hashnode/image/upload/v1744559385614/57b58bfe-7fc2-4fa7-a0d2-19485558899a.png)

---

## How to Create a New Admin User and Delete the Default Admin User

By default, the Grafana Add-on in Home Assistant uses an auth proxy and creates a default user (`admin`) with a password (`hassio`) that's synced with your HA login session. This prevents password or user changes through the UI.

For context, an auth proxy, or authentication proxy, acts as an intermediary between a client and a target resource, handling authentication and authorization on behalf of the client

As a security step, we need to create a new user for the Grafana Add-on and edit their permission to have admin privileges, then delete the default admin user. This is because you can’t change the default admin user password on the Add-on.

Go to Grafana’s menu > Administration> Users and access > Users. Then create a new user.

![A screenshot of Grafana users setting page](https://cdn.hashnode.com/res/hashnode/image/upload/v1744571233206/daf2c674-4501-4774-89d9-76992227b531.png)

Next, give it admin privileges. Edit Grafana Admin to be yes and make sure the organization role is set to admin, then save.

![A screenshot of Grafana user setting](https://cdn.hashnode.com/res/hashnode/image/upload/v1744749794592/21e85eab-99ca-4c7d-9d18-19e9f31ea1da.png)

Go back to the Add-on Configuration tab. Scroll to the Network setting and add a port to expose the Add-on. I will be using port 3000. Save and restart the Add-on. If you have SSL turned on and it isn’t configured, the add-on won’t start. You can disable it as we will have Cloudflare handle that.

![A screenshot of Grafana Add-on Configuration tab](https://cdn.hashnode.com/res/hashnode/image/upload/v1744750541094/326aa725-7b81-4407-82ef-e6589a153b9c.png)

To confirm that the port has been exposed properly, go to `http://ha_ip:3000/` and confirm you see this Grafana login screen. Make sure it is http and not https.

![A screenshot of Grafana homepage accessed from outside Home Assistant url](https://cdn.hashnode.com/res/hashnode/image/upload/v1744563139292/e17d2691-3b77-4faf-997d-95a0b3141066.png)

Log in as the new user you created. Then go to your list of users and delete the default admin user.

![A screenshot of edit to the default admin user](https://cdn.hashnode.com/res/hashnode/image/upload/v1744750661705/1d98e960-e325-4a5c-9746-64ff1819a573.png)

After that, go back to the Grafana Add-on Configuration tab. Click on the 3 dots on the Options row and choose Edit in YAML. Then add this line below to your configuration file and save.

```yaml
grafana_ingress_user: usernameofnewuser
```

---

## How to Enable Remote Access to the Solar Dashboard

At this point, we have the solar dashboard all ready and we can access it in Home Assistant while inside our home network. But we don’t want it only that way. We want anyone to be able to visit the link without having access to our home network.

I will be implementing this part with the aid of a Home Assistant Cloudflared Add-on that leverages Cloudflare Tunnel. Here is the [Github repository (<VPIcon icon="iconfont icon-github"/>`brenner-tobias/addon-cloudflared`)](https://github.com/brenner-tobias/addon-cloudflared) - the installation is simple and stress-free.

After going through the setup and having remote access to your Home Assistant network (remember to have 2FA turned on), go to the Cloudflared Add-on configuration tab and edit the Additional Hosts part.

```yaml
- hostname: subdomain_you_want.your_domain.xyz
  service: http://ha_ip:3000
  disableChunkedEncoding: true
```

Save and restart the Add-on and check the logs. You should see it creating a DNS entry for the hostname you added.

As another security step, go to your Grafana Add-on Configuration tab. Add these values to the environment variables.

```yaml
- name: GF_AUTH_ANONYMOUS_ENABLED
  value: "true"
- name: GF_AUTH_ANONYMOUS_ORG_ROLE
  value: "Viewer"
- name: GF_AUTH_DISABLE_LOGIN_FORM
  value: "true"
```

- `GF_AUTH_ANONYMOUS_ENABLED`: Anyone who visits Grafana without logging in will still be allowed in.
- `GF_AUTH_ANONYMOUS_ORG_ROLE`: This sets the default permission for anonymous users. In this case, anonymous users will have the viewer role.
- `GF_AUTH_DISABLE_LOGIN_FORM`: Disables the login form on the Grafana login page. Make sure you are already logged in on the remote hostname. But you can always edit this on the Add-on Configuration tab if you get locked out.

---

## Wrapping Up

Finally, go to the Remote hostname for your Grafana and you should see the Grafana home page. Then go to your dashboards and click on the solar dashboard created. Share it and choose publicly. Now you can share that link (the URL on that page and not the actual copied URL from the share button) with anyone and they can get to see your beautiful dashboard.

This method serves as an all-in-one way of having everything done, through your Home Assistant machine. I hope you had fun tinkering, see you next time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Public Grafana-based Solar Monitoring Dashboard in Home Assistant",
  "desc": "If you have a solar inverter setup, one thing you would agree on with me is that data from your solar inverter setup is really important. Another thing that is also important is having a way to show what your energy generation, consumption, and so on...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-public-grafana-based-solar-monitoring-dashboard-in-home-assistant.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
