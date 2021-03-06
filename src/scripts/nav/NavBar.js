export const NavBar = () => {
    return `<div id="go-home" class="navigation__item navigation__icon">
                <a href="/" title="Home Page"><img src="./images/icon-pb.png" alt="Giffygram icon" /></a>
            </div>
            <div class="navigation__item navigation__name">
                Giffygram
            </div>
            <div class="navigation__item navigation__search">
                <input type="text" id="postSearch" placeholder="Search posts..." />
            </div>
            <div class="navigation__item navigation__myPosts">
                <button id="myPosts" class="fakeLink">My Posts</button>
            </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="./images/icon-fountain-pen.svg" alt="Direct message" />
            </div>
            <div class="navigation__item navigation__logout">
                <button id="logout" class="fakeLink">Logout</button>
            </div>`
}