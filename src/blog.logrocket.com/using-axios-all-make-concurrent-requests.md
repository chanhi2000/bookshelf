---
lang: en-US
title: "Using axios.all to make concurrent requests"
description: "Article(s) > Using axios.all to make concurrent requests"
icon: iconfont icon-axios
category:
  - Node.js
  - Axios
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - axios
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using axios.all to make concurrent requests"
    - property: og:description
      content: "Using axios.all to make concurrent requests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-axios-all-make-concurrent-requests.html
prev: /programming/js/articles/README.md
date: 2021-10-26
isOriginal: false
author:
  - name: Ejiro Asiuwhu
    url : https://blog.logrocket.com/author/ejiroasiuwhu/
cover: /assets/image/blog.logrocket.com/using-axios-all-make-concurrent-requests/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Axios > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-axios/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Using axios.all to make concurrent requests"
  desc="Learn about Axios' axios.all function for HTTP requests, differentiating Promise.all and axios.all, and making concurrent API requests."
  url="https://blog.logrocket.com/using-axios-all-make-concurrent-requests"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/using-axios-all-make-concurrent-requests/banner.png"/>

`axios.all` is a helper method built into Axios to deal with concurrent requests. Instead of making multiple HTTP requests individually, the `axios.all` method allows us to make multiple HTTP requests to our endpoints altogether.

![Using Axios.all To Make Concurrent Requests](/assets/image/blog.logrocket.com/using-axios-all-make-concurrent-requests/banner.png)

The `axios.all` function accepts an iterable object that must be a promise, such as a JavaScript array, and it returns an array of responses.

In this post, we’ll learn how to use the `axios.all` function to make HTTP requests, the difference between using `Promise.all` and `axios.all`, and making concurrent API requests in Axios.

---

## Using `axios.all`

To begin using the `axios.all` method, let’s [**make an HTTP request**](/blog.logrocket.com/http-requests-axios.md) to the following endpoints:

```js
let endpoints = [
  'https://api.github.com/users/ejirocodes',
  'https://api.github.com/users/ejirocodes/repos',
  'https://api.github.com/users/ejirocodes/followers',
  'https://api.github.com/users/ejirocodes/following'
];

axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
  (data) => console.log(data),
);
```

Here, we declare an array of endpoints we call `endpoints` and call the `.all` method on our Axios instance. This maps through each of the items in the endpoints’ array. Then, using the `GET` method on the Axios instance to make a request to our list of endpoints, we get each response from the server.

This request returns an array as a response and the data in the array is ordered according to our `endpoints` array, meaning Axios must first get data from the following endpoint:

```plaintext title="url endpoint"
https://api.github.com/users/ejirocodes
```

Then, the last data returned from the endpoint is the following:

```plaintext title="url endpoint"
https://api.github.com/users/ejirocodes/following
```

Now, let’s open the browser developer console and network tabs to confirm the order of the API response.

![console tab](/assets/image/blog.logrocket.com/using-axios-all-make-concurrent-requests/console-tab.png)

![network tab](/assets/image/blog.logrocket.com/using-axios-all-make-concurrent-requests/network-tab.png)

You may be thinking of sticking to making multiple API requests separately using the regular `GET` method. But, unlike the `axis.get` method where, if one promise resolves or rejects, it doesn’t affect the others. With the `axios.all` method, if one of our promises fails, the entire request fails.

This implies that for us to get a successful response from our endpoints when using `axios.all`, all the requests must be successful.

Now let’s refactor our code by adding the `axios.spead` method. This method accepts a callback and can destructure our array of responses, which makes our code more readable:

```js
let endpoints = [
  'https://api.github.com/users/ejirocodes',
  'https://api.github.com/users/ejirocodes/repos',
  'https://api.github.com/users/ejirocodes/followers',
  'https://api.github.com/users/ejirocodes/following'
];

axios.all(promises.map((promise) => axios.get(promise))).then(
  axios.spread((user, repos, followers, following) => {
    console.log({ user, repos, followers, following });
  })
);
```

Notice how helpful the `axios.spread` helper function is: we can use it to get all the data at once and then use it in the callback.

By calling `axios.spread((user, repos, followers, following)` like this, we can say we want to name the first response from our Axios calls, `user` and `repo`.

Now, let’s take what we have at the top a little bit further; let’s pull out the [data object that will be sent by the server (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios#response-schema):

```js
axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
  axios.spread(({data: user}, {data:repos}, {data:followers}, {data:following}) => {
    console.log({ user, repos, followers, following });
  })
);
```

We can do this with [Axios’ response schema (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios#response-schema) for every request that contains the following data object, which is the response provided by the server.

So essentially, we use object destructuring to unpack values, that is, unpacking `data` from the response objects into distinct variables, like `user`, `repos`, `followers`, and `following`.

Also, notice that we are destructuring data from each response and renaming it `user`, `repos`, `followers`, and `following`, respectively.

---

## `Promise.all` vs. `axios.all`

As of [July 15, 2020 (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios/blob/76f09afc03fbcf392d31ce88448246bcd4f91f8c/CHANGELOG.md#0200-pre-july-15-2020), Axios updated its [GitHub README (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios#concurrency-deprecated) to reflect that the `axios.all` helper method has been deprecated and [**should be replaced with `Promise.all`**](/blog.logrocket.com/understanding-promise-all-in-javascript.md).

Since there is an [unofficial proposal (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios/issues/1042) to get rid of both the `axios.all` and `axios.spread`methods completely in v1 of Axios, let’s see how we can deprecate the `axios.all` methods using native JavaScript features like `Promise.all` and ES6 parameter destructuring.

Note that only the docs provide this depreciation, not the codebase/library. So, `axios.all` still works in the latest version of Axios, and many developers still use `axios.all` in modern codebase. Pointing out the deprecation is in anticipation that `axios.all` could be replaced at some point in the future.

There is one important thing we should consider at this point, however. The `axios.all` is a helper method built with the [<FontIcon icon="fa-brands fa-firefox"/>native `Promise.all`method in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all). This implies we can easily replace the `axios.all` method with `promise.all`.

The `Promise.all` method returns a promise that resolves when all of the promises in the iterable argument resolve.

Now, let’s see this in action:

```js
let endpoints = [
  'https://api.github.com/users/ejirocodes',
  'https://api.github.com/users/ejirocodes/repos',
  'https://api.github.com/users/ejirocodes/followers',
  'https://api.github.com/users/ejirocodes/following'
];

// Return our response in the allData variable as an array
Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
  axios.spread((...allData) => {
    console.log({ allData });
  })
);
```

The code above gives us the same results as using the `axios.all` method.

Notice that even if we’ve gotten rid of `axios.all` method, we are still using the `axios.spread` helper; the ES6 destructuring operator can easily replace this.

Also notice that we are using both array and object destructuring in one go to pull out only the data object sent by the server:

```js
Promise.all(endpoints.map((endpoint) => 
  axios.get(endpoint)))
    .then(([
      {data: user}, 
      {data: repos}, 
      {data: followers}, 
      {data: following}
    ]) => {
      console.log({ user, repos, followers, following });
    });
```

And voilà! We’ve successfully used native JavaScript methods to make a concurrent HTTP request.

---

## Concurrent API requests in React with `Promise.all` and Axios

To make simultaneous API requests in a React app using Axios and `Promise`, we must use React Hooks.

In this example, we will get both the followers and following data of a GitHub profile. The idea is that, if for some reason, the API request for the `followers` data for the user’s GitHub profile is unsuccessful, we can’t get the response for the `followers` data for the user’s GitHub profile.

This means the request for the user’s GitHub user profile following count will also fail.

This is because when we make concurrent requests, the response from one request depends on the other. So, essentially, we want both or all requests to fail if at least one fails.

![Github followers and following](/assets/image/blog.logrocket.com/using-axios-all-make-concurrent-requests/GitHub-profile-followers-following.png)

Using `Promise.all` and ES6 destructuring, let’s write a function that will perform multiple `GET` requests concurrently in our React app:

```jsx
// In our component, we have to save both data in our state using the useState hook
const [followers, setFollowers] = useState([])
const [followings, setFollowing] = useState([])

const getGithubData = () => {
  let endpoints = [
    'https://api.github.com/users/ejirocodes',
    'https://api.github.com/users/ejirocodes/repos',
    'https://api.github.com/users/ejirocodes/followers',
    'https://api.github.com/users/ejirocodes/following'
  ];
  Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{ data: user }, { data: repos }, { data: followers }, { data: followings }]) => {
    setFollowers(followers)
    setFollowing(followings)
  });
}
```

Next, let’s call the function when the page loads. To achieve this the React way, [**we’ll use the `useEffect`Hook**](/blog.logrocket.com/useeffect-react-hook-complete-guide.md):

```jsx
// remember to import useEffect from react
useEffect(() => {
  getGithubData();
}, []);
```

Then, render both the followers and following data we just received from the various endpoints to the DOM:

```jsx
// Wherever your return statement is in your React app
<section style={{ display: "flex" }}>
  <section>
    <h2>Followers</h2>
    {followers.length > 0 && (
      <div>
        {followers.map((follower) => (
          <div key={follower.id}>
            <img src={follower.avatar_url} alt={follower.html_url} />
            <p>GitHub Profile: {follower.html_url}</p>
          </div>
        ))}
      </div>
    )}
  </section>
  <section>
    <h2>Following</h2>
    {followings.length > 0 && (
      <div>
        {followings.map((following) => (
          <div key={following.id}>
            <img src={following.avatar_url} alt={following.html_url} />
            <p>GitHub Profile: {following.html_url}</p>
          </div>
        ))}
      </div>
    )}
  </section>
</section>
```

---

## Conclusion

In this post, we’ve covered how to make concurrent [**HTTP requests**](/blog.logrocket.com/using-axios-all-make-concurrent-requests.md) using the `axios.all` method, which is built on top of the `Promise.all` JavaScript method underneath the hood.

We also saw how to unpack our response array using the `axios.spread` helper function and looked at how it can be replaced with ES6 parameter destructuring, specifically, the array and object destructuring methods.

And finally, we discussed how to use Hooks in React to make concurrent API requests using Axios and the native JavaScript `Promise.all` method.

I created [a repository on GitHub (<FontIcon icon="iconfont icon-github"/>`ejirocodes/axios-all`)](https://github.com/ejirocodes/axios-all) containing all the methods we’ve covered in this post if you would like to see the source code.

That’s all for now! Let me know in the comments section below what you thought of this article. I am social on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`ejirocodes`)](https://x.com/ejirocodes) and [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`ejiro-asiuwhu`)](https://linkedin.com/in/ejiro-asiuwhu/). Thank you for reading and stay tuned for more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using axios.all to make concurrent requests",
  "desc": "Learn about Axios' axios.all function for HTTP requests, differentiating Promise.all and axios.all, and making concurrent API requests.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-axios-all-make-concurrent-requests.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
