---
lang: en-US
title: "Build Stunning Grids in Minutes with LazyVerticalGrid | 𓈈 𓊁 𓊂 𓐖 |"
description: "Article(s) > Build Stunning Grids in Minutes with LazyVerticalGrid | 𓈈 𓊁 𓊂 𓐖 |"
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
      content: "Article(s) > Build Stunning Grids in Minutes with LazyVerticalGrid | 𓈈 𓊁 𓊂 𓐖 |"
    - property: og:description
      content: "Build Stunning Grids in Minutes with LazyVerticalGrid | 𓈈 𓊁 𓊂 𓐖 |"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/build-stunning-grids-in-minutes-with-lazyverticalgrid-%F0%93%88%88-%F0%93%8A%81-%F0%93%8A%82-%F0%93%90%96.html
prev: /programming/java-android/articles/README.md
date: 2024-10-28
isOriginal: false
author: droidcon
cover: https://droidcon.com/wp-content/uploads/2024/10/1_L595ZfuVwNGgoBuPr5mzBQ-600x600.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build Stunning Grids in Minutes with LazyVerticalGrid | 𓈈 𓊁 𓊂 𓐖 |"
  desc="Want to create stunning grid layouts in your Jetpack Compose app? Look no further than LazyVerticalGrid. This powerful tool simplifies the process of designing and implementing efficient grid-based interfaces. In this comprehensive tutorial, I’ll share my insights and experience using LazyVerticalGrid in a real-world production app on Google Play. I’ll explore its key features, best practices, and practical tips to help you create stunning grids that captivate your users. 🤓"
  url="https://droidcon.com/2024/10/28/build-stunning-grids-in-minutes-with-lazyverticalgrid-%F0%93%88%88-%F0%93%8A%81-%F0%93%8A%82-%F0%93%90%96"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/10/1_L595ZfuVwNGgoBuPr5mzBQ-600x600.webp"/>

![Jetpack Compose `LazyVerticalGrid` in action in the NHL Hockey app on Google Play.](https://droidcon.com/wp-content/uploads/2024/10/1_L595ZfuVwNGgoBuPr5mzBQ-600x600.webp)

Want to create stunning grid layouts in your Jetpack Compose app? Look no further than`LazyVerticalGrid`. This powerful tool**simplifies**the process of designing and implementing efficient grid-based interfaces. In this comprehensive tutorial, I’ll share my insights and experience using`LazyVerticalGrid`in a real-world**production**app on Google Play. I’ll explore its key features, best practices, and practical tips to help you create stunning grids that captivate your users. 🤓

**To populate the grid with player data, I make a network call to retrieve information for the selected season.** Here’s how I have implemented that:

```kotlin
 // Wrapper for state management
sealed class PlayersUiState {
    data object Loading : PlayersUiState()
    data class Success(val players: List<Player>) : PlayersUiState()
    data class Error(val throwable: Throwable) : PlayersUiState()
}

 private val _uiState = MutableStateFlow<PlayersUiState>(PlayersUiState.Loading)
    val uiState: StateFlow<PlayersUiState> = _uiState.asStateFlow()

    private val coroutineExceptionHandler = CoroutineExceptionHandler { _, throwable ->
        viewModelScope.launch {
            _uiState.emit(PlayersUiState.Error(throwable = throwable))
        }
    }

suspend fun getSkatersAndGoalies(season: String) {
    viewModelScope.launch(context = ioDispatcher + coroutineExceptionHandler) {
        repository.getAllNhlPlayers(season)
            .catch { e ->
                _uiState.emit(PlayersUiState.Error(Throwable(e.message ?: "Unknown error")))
            }
            .collectLatest { players ->
                val sortedPlayers = (players.forwards + players.defensemen + players.goalies).sortedBy { it.lastName.default }
                _uiState.emit(PlayersUiState.Success(sortedPlayers))
            }
    }
}
```

- **Fetch player data:**Use`repository.getAllNhlPlayers(season)`to retrieve player data for the specified season.
- **Handle errors:**Catch any exceptions that might occur during the network call and emit an error state to the UI.
- **Sort players:**Combine the forwards, defensemen, and goalies, then sort them by last name.
- **Emit success:**Emit a success state to the UI, including the sorted players and the transformed season string.

---

## UI Composable

**Now I bring the state to life by connecting it to the UI components.**Here’s how I’ve implemented it:

```kotlin
@Composable
fun ShowLazyVerticalGridPlayers(uiState: PlayersUiState.Success, navController: NavController) {
    val players = uiState.players
    val scrollBehavior = TopAppBarDefaults.exitUntilCollapsedScrollBehavior(rememberTopAppBarState())
    val isCollapsed by remember { derivedStateOf { scrollBehavior.state.collapsedFraction == 1f } }
    val title = if (!isCollapsed) "ALL NHL\\nPLAYERS" else "PLAYERS"
    Scaffold(
        modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
        topBar = {
            ParallaxToolBarV2(
                scrollBehavior = scrollBehavior,
                navController = navController,
                title = title,
                color = DefaultBlack,
                actions = {
                    AsyncImage(
                        model = ImageRequest.Builder(LocalContext.current)
                            .data(DefaultNhlTeam.teamLogo)
                            .decoderFactory(SvgDecoder.Factory())
                            .crossfade(true)
                            .diskCachePolicy(CachePolicy.ENABLED)
                            .build(),
                        contentDescription = null,
                        modifier = Modifier.padding(horizontal = 8.dp).size(60.dp)

                    )
                    Spacer(modifier = Modifier.width(dimensionResource(R.dimen.margin_medium_large)))
                }
            )
        },
        bottomBar = { BottomAppBar(Modifier.fillMaxWidth()) { SetAdmobAdaptiveBanner() } },
    ) { padding ->
        LazyVerticalGrid(
            modifier = Modifier.padding(padding),
            columns = GridCells.Fixed(3),
            contentPadding = PaddingValues(start = 12.dp, top = 16.dp, end = 12.dp, bottom = 16.dp),
            content = {
                items(players.size) { index ->
                    PlayerCell(players\[index\], navController)
                }
            }
        )
    }
}
```

The`LazyVerticalGrid`component creates a grid layout with 3 columns. It applies padding around the grid and its content, and populates the grid with`PlayerCell`components based on the`players`list.

---

## Compose Fun Fact

**You should hoist UI state to the lowest common ancestor between all the composables that read and write it.**

::: note

You shouldn’t pass ViewModel instances down to other composables. (You can’t build**@Preview**) ❌👀

— Instead —

Use:**Property drilling**

“Property drilling” refers to passing data through several nested children components to the location where they’re read.

:::

---

## The Cell

**The `PlayerCell` composable displays each player’s information in a simple card format.**It includes the player’s headshot, name, and a “PROFILE” button to navigate to their details. Here’s how it’s structured:

```kotlin
@Composable
fun PlayerCell(player: Player, navController: NavController) {
    val scope = rememberCoroutineScope()
    DisposableEffect(scope) { onDispose { scope.cancel() } }
    Card(modifier = Modifier.padding(4.dp).fillMaxWidth(),
        border = BorderStroke(1.dp, colorResource(R.color.whiteSmokeColor)),
        colors = CardDefaults.cardColors(containerColor = colorResource(R.color.whiteColor))) {
        Column(modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally) {
            Spacer(Modifier.height(12.dp))
            Box(Modifier.clip(CircleShape).size(74.dp).background(colorResource(R.color.offWhiteColor))
                .border(shape = CircleShape, width = 1.dp, color = colorResource(R.color.whiteSmokeColor))) {
                AsyncImage(model = player.headshot, contentDescription = null, modifier = Modifier.clip(CircleShape))
            }
            Spacer(Modifier.height(6.dp))
            Text(
                text = player.firstName.default,
                style = TextStyle(platformStyle = PlatformTextStyle(includeFontPadding = false)),
                fontSize = 15.dp.value.sp,
            )
            val lastName = player.lastName.default.takeIf { it.length > 9 }?.substring(0, 9)?.plus("..") ?: player.lastName.default
            Text(
                text = lastName,
                fontWeight = FontWeight.Bold,
                style = TextStyle(platformStyle = PlatformTextStyle(includeFontPadding = false)),
                fontSize = 15.dp.value.sp,
            )
            Spacer(Modifier.height(6.dp))
            Text(
                text = "PROFILE",
                textAlign = TextAlign.Center,
                fontSize = 12.dp.value.sp,
                fontWeight = FontWeight.SemiBold,
                style = TextStyle(platformStyle = PlatformTextStyle(includeFontPadding = false)),
                modifier = Modifier.border(shape = RoundedCornerShape(30.dp), width = 1.dp, color = Color.Black)
                    .background(Color.Transparent).padding(horizontal = 16.dp, vertical = 2.dp)
                    .clickable { scope.launch { navController.navigate(PlayerProfile.createRoute(id = player.id)) } }
            )
            Spacer(Modifier.height(12.dp))
        }
    }
}
```

---

## `@Preview` the Grid in Android Studio

`ShowLazyVerticalGridPlayersScreenPreview`composable, allowing developers to visualize how the`ShowLazyVerticalGridPlayersScreen`component will look and behave without running the entire app. It uses a`@Preview`annotation to specify the preview configuration and provides a sample list of players to populate the grid.

```kotlin
@RequiresApi(Build.VERSION_CODES.O)
@Preview(showBackground = true, showSystemUi = true)
@Composable
private fun ShowLazyVerticalGridPlayersScreenPreview(
    @PreviewParameter(ShowLazyVerticalGridPlayersScreenPreviewParameterProvider::class) players: List<Player>
) {
    Column {
ShowLazyVerticalGridPlayers(PlayersUiState.Success(players, ""), rememberNavController())
    }
}

private class ShowLazyVerticalGridPlayersScreenPreviewParameterProvider : PreviewParameterProvider<List<Player>> {
    override val values: Sequence<List<Player>> =
            sequenceOf(
                listOf(
                    Player(firstName = Default("Connor"), lastName = Default("McDavid")),
                    Player(firstName = Default("James"), lastName = Default("van Riemsdyk")),
                    Player(firstName = Default("John"), lastName = Default("Brackenborough")),
                    Player(firstName = Default("Sidney"), lastName = Default("Crosby")),
                    Player(firstName = Default("Bobby"), lastName = Default("Brink")),
                    Player(firstName = Default("Austin"), lastName = Default("Matthews"))
                )
            )
}
```

![`LazyVerticalGrid` Screen in Android Studio](https://droidcon.com/wp-content/uploads/2024/10/1_JjXTO8WqJFHnDGBibTB2vA-600x278.webp)

---

## DON’T FORGET TO TEST, TEST, TEST: 🧪🧪🧪

**To ensure the `getSkatersAndGoalies` function is working correctly, I have written a unit test to verify its behavior.** Here’s a breakdown of the test:

```kotlin
@Test
fun `getSkatersAndGoalies() should emit list of skaters`() = runTest {
    // Given
    val goalie = Player(positionCode = "G")
    val skater = Player(positionCode = "C")
    val mockPlayers = Players(forwards = listOf(skater), goalies = listOf(goalie))
    val mockSeason = "20232024"
    // When
    coEvery { mockDateUtilsRepository.getCurrentSeasonInYears() } returns mockSeason
    coEvery { mockRepository.getAllNhlPlayers(mockSeason) } returns flowOf(mockPlayers)
    viewModel.getSkatersAndGoalies(mockSeason)
    advanceUntilIdle()
    // Then
    val actualPlayers = (viewModel.uiState.value as? PlayersUiState.Success)?.players.orEmpty()
    assertEquals(2, actualPlayers.size)
}
```

Major tech companies (*PayPal, Google, Meta, Salesforce…*)**value engineers who understand the significance of testing**for building reliable and high-quality applications and may help you land that big bank jobby-job. 🤞🏽😃💰

**That’s a wrap!**With`LazyVerticalGrid`, you’ve unlocked the power to build stunning grid layouts in your Jetpack Compose app. Ready to see it in action?[**<FontIcon icon="fa-brands fa-google-play"/>Download the NHL Hockey app on Google Play**](https://play.google.com/store/apps/dev?id=7614313297301862853&hl=en_US)and experience the magic firsthand. Don’t forget to leave a review and let me know what you think!

🗣️: reach out on[X (<FontIcon icon="fa-brands fa-x-twitter"/>`BrickyardApps`)](https://x.com/BrickyardApps)or[Insta (<FontIcon icon="fa-brands fa-instagram"/>`brickyardmobile`)](https://instagram.com/brickyardmobile)

<SiteInfo
  name="Android Apps by Brickyard Mobile on Google Play"
  desc="Simple and fun one-tap apps."
  url="https://play.google.com/store/apps/dev?id=7614313297301862853&hl=en_US/"
  logo="https://gstatic.com/android/market_images/web/favicon_v3.ico"
  preview="https://play-lh.googleusercontent.com/Tmsp7WXv-LSWek3RCAaiD_1jgSSM3lOA-oWpkh73iITKGGQX8FWd0sF_7S4aq0WYE84"/>

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/build-stunning-grids-in-minutes-with-lazyverticalgrid-17702887cccb)

<SiteInfo
  name="Build Stunning Grids in Minutes with LazyVerticalGrid | 𓈈 𓊁 𓊂 𓐖 |"
  desc="Want to create stunning grid layouts in your Jetpack Compose app? Look no further than LazyVerticalGrid. This powerful tool simplifies the…"
  url="https://proandroiddev.com/build-stunning-grids-in-minutes-with-lazyverticalgrid-17702887cccb/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*L595ZfuVwNGgoBuPr5mzBQ.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build Stunning Grids in Minutes with LazyVerticalGrid | 𓈈 𓊁 𓊂 𓐖 |",
  "desc": "Want to create stunning grid layouts in your Jetpack Compose app? Look no further than LazyVerticalGrid. This powerful tool simplifies the process of designing and implementing efficient grid-based interfaces. In this comprehensive tutorial, I’ll share my insights and experience using LazyVerticalGrid in a real-world production app on Google Play. I’ll explore its key features, best practices, and practical tips to help you create stunning grids that captivate your users. 🤓",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/build-stunning-grids-in-minutes-with-lazyverticalgrid-%F0%93%88%88-%F0%93%8A%81-%F0%93%8A%82-%F0%93%90%96.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
