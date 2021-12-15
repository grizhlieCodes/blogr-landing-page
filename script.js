const mobileMenuButton = document.querySelector('button.header__menu-button')
const navMenuCategoryButtons = [...document.querySelectorAll('button.header__menu-heading')]
const navMenuCategoryLinkContainers = [...document.querySelectorAll('.header__menu-list')]
const allNavMenuLinks = document.querySelectorAll('header a')

//Capitalized to show a constant value. For this project at least.
//Better to capitalize TRUE constants like hours in day, Pi, etc.
const LINK_CONTAINER_VALUES = {
    paddingTop: 17,
    paddingBottom: 25,
    marginTop: 24
}

const createEventListenersForHeaderMenuActivation = () => {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('active')
    })

    navMenuCategoryButtons.forEach((navMenuCategoryButton, index) => {
        navMenuCategoryButton.addEventListener('click', () => {
            activateOrDeactivateClickedNavMenuCategoryButton(navMenuCategoryButton, index)
        })
    })

}

const updateTabIndexOfSelectedLinks = (activateTabIndex, linksArray) => {
    if (activateTabIndex) {
        linksArray.forEach(link => link.tabIndex = '0')
    } else {
        linksArray.forEach(link => link.tabIndex = '-1')
    }
}

const removeTabFunctionalityFromAllNavLinks = () => {
    allNavMenuLinks.forEach(link => link.tabIndex = '-1')
}

const clearMenuList = (navMenuCategoryLinkContainer) => {
    navMenuCategoryLinkContainer.style.marginTop = null
    navMenuCategoryLinkContainer.style.paddingTop = null
    navMenuCategoryLinkContainer.style.paddingBottom = null
    navMenuCategoryLinkContainer.style.maxHeight = null
}

const deactivateMobileMenuButton = () => {
    mobileMenuButton.classList.remove('active')
}

const deactivateAllMenuHeadingButtons = () => {
    navMenuCategoryButtons.forEach(btn => {
        btn.classList.remove('active')
        const menuList = btn.nextElementSibling
        clearMenuList(menuList)
    })
}

const deactivateSiblingNavMenuCategoryButtons = (clickedNavMenuCategoryButtonIndex) => {
    const siblingNavMenuCategoryButtons = [...navMenuCategoryButtons.filter((b, i) => i !== clickedNavMenuCategoryButtonIndex)]
    siblingNavMenuCategoryButtons.forEach((siblingNavMenuCategoryButton, index) => {
        siblingNavMenuCategoryButton.classList.remove('active')
        const navMenuCategoryLinkContainer = navMenuCategoryLinkContainers[index]
        clearMenuList(navMenuCategoryLinkContainer)
    })
};

const checkViewportWidth = () => {
    const chosenDesktopWidth = 950
    const mediaQuery = window.matchMedia(`(min-width: ${chosenDesktopWidth}px)`)
    if (mediaQuery.matches) {
        return true
    } else {
        return false
    }
}

const activateOrDeactivateClickedNavMenuCategoryButton = (clickedNavMenuCategoryButton, index) => {
    const navMenuCategoryButtonIsActive = clickedNavMenuCategoryButton.classList.contains('active')
    deactivateSiblingNavMenuCategoryButtons(index)
    removeTabFunctionalityFromAllNavLinks()

    clickedNavMenuCategoryButton.classList.toggle('active')
    const navMenuCategoryLinkContainer = navMenuCategoryLinkContainers[index]
    const navMenuCategoryLinks = navMenuCategoryLinkContainer.querySelectorAll('a')
    const navMenuCategoryLinksQuantity = navMenuCategoryLinks.length
    const navMenuCategoryLinkHeight = parseInt(getComputedStyle(navMenuCategoryLinks[0]).height)
    const navMenuCategoryLinkContainerStyles = window.getComputedStyle(navMenuCategoryLinkContainer)
    const navMenuCategoryLinkContainerGapsTotalHeight = parseInt(navMenuCategoryLinkContainerStyles.rowGap) * (navMenuCategoryLinksQuantity - 1)
    const {paddingTop, paddingBottom, marginTop} = LINK_CONTAINER_VALUES
    const isDesktopWidth = checkViewportWidth()
    const navMenuCategoryLinksHeight = navMenuCategoryLinkHeight * navMenuCategoryLinksQuantity
    const customScrollHeight = paddingBottom + paddingTop + navMenuCategoryLinkContainerGapsTotalHeight + navMenuCategoryLinksHeight

    // console.log({gap, paddingTop, paddingBottom, marginTop, navMenuCategoryLinksHeight, customScrollHeight})
    if (navMenuCategoryButtonIsActive) {
        clearMenuList(navMenuCategoryLinkContainer)
    } else {
        const activateTabIndex = true
        updateTabIndexOfSelectedLinks(activateTabIndex, navMenuCategoryLinks)
        if(!isDesktopWidth) navMenuCategoryLinkContainer.style.marginTop = `${marginTop}px`
        navMenuCategoryLinkContainer.style.paddingTop = `${paddingTop}px`
        navMenuCategoryLinkContainer.style.paddingBottom = `${paddingBottom}px`
        navMenuCategoryLinkContainer.style.maxHeight = `${customScrollHeight}px`
    }
}

const createEventListenersForHeaderMenuClosing = () => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            deactivateAllMenuHeadingButtons()
            deactivateMobileMenuButton()
            const activateMenuLinks = false
            updateTabIndexOfSelectedLinks(activateMenuLinks, allNavMenuLinks)
        }
    })
    window.addEventListener('click', (e) => {
        const headerMenu = e.target.closest('.header__menu')
        if (!headerMenu) {
            deactivateAllMenuHeadingButtons()
            updateTabIndexOfSelectedLinks(false, allNavMenuLinks)
        }
        const header = e.target.closest('header.header')
        if (!header) {
            deactivateMobileMenuButton()
            updateTabIndexOfSelectedLinks(false, allNavMenuLinks)

        }
    })

    navMenuCategoryLinkContainers.forEach((navMenuCategoryLinkContainer, index) => {
        navMenuCategoryLinkContainer.addEventListener('click', () => {
            navMenuCategoryButtons[index].click()
        })
    })

}

createEventListenersForHeaderMenuActivation()
createEventListenersForHeaderMenuClosing()


