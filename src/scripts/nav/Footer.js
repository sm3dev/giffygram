export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `<section class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount">0</span>
            </section>
            <section class="footer__item">&copy; 2021 Copyright GiffyGram</section>`
}
