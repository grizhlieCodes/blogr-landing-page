const btnMenu = document.querySelector('button.header__menu-button')
const btnsMenuHeadings = [...document.querySelectorAll('button.header__menu-heading')]
const headerMenuLists = [...document.querySelectorAll('.header__menu-list')]

const activateMobileMenuButton = () => {
    btnMenu.addEventListener('click', () => {
        btnMenu.classList.toggle('active')
    })
}

activateMobileMenuButton()

const clearMenuList = (menuList) => {
    menuList.style.marginTop = null
    menuList.style.paddingTop = null
    menuList.style.paddingBottom = null
    menuList.style.maxHeight = null
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

const handleMenuHeadingButtonClick = (btn, index) => {

    const btnActive = btn.classList.contains('active')
    const otherButtons = [...btnsMenuHeadings.filter((b, i) => i !== index)]
    deactivateOtherMenuHeadingButtons(otherButtons)
    btn.classList.toggle('active')

    const menuList = btn.nextElementSibling
    const listItems = menuList.querySelectorAll('li')
    const listItemsQuant = menuList.querySelectorAll('li').length
    const listItemHeight = parseInt(getComputedStyle(listItems[0]).height)
    const listItemFontSize = parseInt(getComputedStyle(listItems[0]).fontSize)
    const menuListStyles = window.getComputedStyle(menuList)
    const gap = parseInt(menuListStyles.rowGap) * (listItemsQuant - 1)
    const paddingTop = 17
    const paddingBottom = 25
    const marginTop = 24
    const scrollHeight = listItemHeight * listItemsQuant
    const total = paddingBottom + paddingTop + gap + scrollHeight
    // console.log({gap, paddingTop, paddingBottom, marginTop, scrollHeight, total})
    if (btnActive) {
        clearMenuList(menuList)
    } else {
        menuList.style.marginTop = `${marginTop}px`
        menuList.style.paddingTop = `${paddingTop}px`
        menuList.style.paddingBottom = `${paddingBottom}px`
        menuList.style.maxHeight = `${total}px`
    }
}

const activateMenuHeadingButtons = () => {
    btnsMenuHeadings.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            handleMenuHeadingButtonClick(btn, index)
        })
    })
}

activateMenuHeadingButtons()

// : Add listeners to each headerMenuList to click it.
headerMenuLists.forEach((list, index) => {
    list.addEventListener('click', () => {
        btnsMenuHeadings[index].click()
    })
})

//Global listener for Esc

const addGlobalListenersToCloseMenu = () => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            deactivateAllMenuHeadingButtons()
        }
    })
    
    window.addEventListener('click', (e) => {
        //If we haven't clicked on header__menu, deactivate all
        const target = e.target.closest('.header__menu')
        if (!target) {
            deactivateAllMenuHeadingButtons()
        }
    
    })
}

addGlobalListenersToCloseMenu()




//28 * quantity


