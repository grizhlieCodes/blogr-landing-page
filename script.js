({
    "plugins": ["jsdom-quokka-plugin"],
    "jsdom" : {
        "config" : {
            "file" : "./index.html"
        }
    }
})

const btnMenu = document.querySelector('button.header__menu-button')
const btnsMenuHeadings = [...document.querySelectorAll('button.header__menu-heading')]
const headerMenuLists = [...document.querySelectorAll('.header__menu-list')]

const addListenersToAllElements = () => {
    btnMenu.addEventListener('click', () => {
        btnMenu
        btnMenu.classList.toggle('active')
    })

    btnsMenuHeadings.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            handleMenuHeadingButtonClick(btn, index)
        })
    })

    headerMenuLists.forEach((list, index) => {
        list.addEventListener('click', () => {
            btnsMenuHeadings[index].click()
        })
    })
}


const clearMenuList = (menuList) => {
    menuList.style.marginTop = null
    menuList.style.paddingTop = null
    menuList.style.paddingBottom = null
    menuList.style.maxHeight = null
}

const closeMobileBtnMenu = () => {
    btnMenu.classList.remove('active')
}

const deactivateAllMenuHeadingButtons = () => {
    btnsMenuHeadings.forEach(btn => {
        btn.classList.remove('active')
        const menuList = btn.nextElementSibling
        clearMenuList(menuList)
    })
}

const deactivateOtherMenuHeadingButtons = (otherButtons) => {
    otherButtons.forEach(btn => {
        btn.classList.remove('active')
        const menuList = btn.nextElementSibling
        clearMenuList(menuList)
    })
};

const checkViewportWidth = () => {
    const mediaQuery = window.matchMedia('(min-width: 950px)')
    if (mediaQuery.matches) {
        return true
    } else {
        return false
    }
}
const handleMenuHeadingButtonClick = (btn, index) => {

    const desktopSize = checkViewportWidth() 
    const btnActive = btn.classList.contains('active') 
    const otherButtons = [...btnsMenuHeadings.filter((b, i) => i !== index)]
    deactivateOtherMenuHeadingButtons(otherButtons)
    btn.classList.toggle('active')
    const menuList = btn.nextElementSibling 
    const listItems = menuList.querySelectorAll('li')
    const listItemsQuantity = menuList.querySelectorAll('li').length
    const listItemHeight = parseInt(getComputedStyle(listItems[0]).height)
    const menuListStyles = window.getComputedStyle(menuList)
    const gap = parseInt(menuListStyles.rowGap) * (listItemsQuantity - 1)
    const paddingTop = 17
    const paddingBottom = 25
    const marginTop = desktopSize ? 0 : 24
    const listItemsHeight = listItemHeight * listItemsQuantity
    const scrollheight = menuList.scrollHeight
    const total = paddingBottom + paddingTop + gap + listItemsHeight
    // console.log({gap, paddingTop, paddingBottom, marginTop, listItemsHeight, scrollheight, total})
    if (btnActive) {
        clearMenuList(menuList)
    } else {
        menuList.style.marginTop = `${marginTop}px`
        menuList.style.paddingTop = `${paddingTop}px`
        menuList.style.paddingBottom = `${paddingBottom}px`
        menuList.style.maxHeight = `${total}px`
    }
}

const addGlobalListenersToCloseMenu = () => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            deactivateAllMenuHeadingButtons()
            closeMobileBtnMenu()
        }
    })
    window.addEventListener('click', (e) => {
        const headerMenu = e.target.closest('.header__menu')
        if (!headerMenu) {
            deactivateAllMenuHeadingButtons()
        }
        const header = e.target.closest('header.header')
        if (!header) {
            closeMobileBtnMenu()
        }
    })
}

addGlobalListenersToCloseMenu()
addListenersToAllElements()
