const header = document.createElement('header')
header.classList.add('header')
header.innerHTML = `

<div class="header__logo-container">
            <img src="./assets/images/logo.svg" alt="">
        </div>
        <button class="header__menu-button">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="header__menu">

            <div class="header__menu-links">
                <div class="header__menu-section header__menu-section--product">
                    <button class="header__menu-heading">
                        <p>Product</p>
                        <picture>
                            <source media="(min-width: 950px)" srcset="./assets/images/icon-arrow-light.svg">
                            <img src="./assets/images/icon-arrow-dark.svg" alt="">
                        </picture>
                    </button>
                    <ul class="header__menu-list">
                        <li class="menu__link">
                            <a href="#">Overview</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Pricing</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Marketplace</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Features</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Intergrations</a>
                        </li>
                    </ul>
                </div>

                <div class="header__menu-section header__menu-section--company">
                    <button class="header__menu-heading">
                        <p>Company</p>
                        <picture>
                            <source media="(min-width: 950px)" srcset="./assets/images/icon-arrow-light.svg">
                            <img src="./assets/images/icon-arrow-dark.svg" alt="">
                        </picture>
                    </button>
                    <ul class="header__menu-list">
                        <li class="menu__link">
                            <a href="#">About</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Team</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Blog</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Careers</a>
                        </li>
                    </ul>
                </div>

                <div class="header__menu-section header__menu-section--connect">
                    <button class="header__menu-heading">
                        <p>Connect</p>
                        <picture>
                            <source media="(min-width: 950px)" srcset="./assets/images/icon-arrow-light.svg">
                            <img src="./assets/images/icon-arrow-dark.svg" alt="">
                        </picture>
                    </button>
                    <ul class="header__menu-list">
                        <li class="menu__link">
                            <a href="#">Contact</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">Newsletter</a>
                        </li>
                        <li class="menu__link">
                            <a href="#">LinkedIn</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="header__menu-ctas">
                <button class="login">
                    Login
                </button>
                <button class="sign-up">
                    Sign Up
                </button>
            </div>


        </div>

`

const body = document.body
body.prepend(header)