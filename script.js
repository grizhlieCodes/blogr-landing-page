const mobileMenuButton = document.querySelector('button.header__menu-button')
const navButtons = [...document.querySelectorAll('button.header__menu-heading')]
const navLinkContainers = [...document.querySelectorAll('.header__menu-list')]
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

    navButtons.forEach((navMenuCategoryButton, index) => {
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
    navButtons.forEach(btn => {
        btn.classList.remove('active')
        const menuList = btn.nextElementSibling
        clearMenuList(menuList)
    })
}

const clearSiblingButtons = (clickedBtnIndex) => {
    navButtons.forEach((btn, index) => {
        if(index !== clickedBtnIndex) {
            btn.classList.remove('active')
            const navLinkContainer = navLinkContainers[index]
            clearMenuList(navLinkContainer)
        }
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
    clearSiblingButtons(index)
    removeTabFunctionalityFromAllNavLinks()

    clickedNavMenuCategoryButton.classList.toggle('active')
    const navLinkContainer = navLinkContainers[index]
    const links = navLinkContainer.querySelectorAll('a')
    const numberOfLinks = links.length
    const numberOfGaps = numberOfLinks - 1
    const linkHeight = parseInt(getComputedStyle(links[0]).height)
    const navLinkContainerStyles = window.getComputedStyle(navLinkContainer)
    const gapsTotalHeight = parseInt(navLinkContainerStyles.rowGap) * (numberOfGaps)
    const navMenuCategoryLinksHeight = linkHeight * numberOfLinks
    const {paddingTop, paddingBottom, marginTop} = LINK_CONTAINER_VALUES //customScrollHeight
    const isDesktopWidth = checkViewportWidth()
    const customScrollHeight = paddingBottom + paddingTop + gapsTotalHeight + navMenuCategoryLinksHeight //custom scrollHeight

    // console.log({gap, paddingTop, paddingBottom, marginTop, navMenuCategoryLinksHeight, customScrollHeight})
    if (navMenuCategoryButtonIsActive) {
        clearMenuList(navLinkContainer)
    } else {
        const activateTabIndex = true
        updateTabIndexOfSelectedLinks(activateTabIndex, links)
        if(!isDesktopWidth) navLinkContainer.style.marginTop = `${marginTop}px`
        navLinkContainer.style.paddingTop = `${paddingTop}px`
        navLinkContainer.style.paddingBottom = `${paddingBottom}px`
        navLinkContainer.style.maxHeight = `${customScrollHeight}px`
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

    navLinkContainers.forEach((navMenuCategoryLinkContainer, index) => {
        navMenuCategoryLinkContainer.addEventListener('click', () => {
            navButtons[index].click()
        })
    })

}

createEventListenersForHeaderMenuActivation()
createEventListenersForHeaderMenuClosing()


