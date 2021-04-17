<script>
export default {
    name: 'NavBar',
    props: {
        items: {
            type: Array,
            default: function () {
                return []
            }
        },
        logoText: {
            type: String,
            default: 'Logo'
        },
        collapsable: {
            type: Boolean,
            default: true
        },
		fixed: {
			type: String,
            default: ''
		},
		sticky: {
			type: Boolean,
            default: false
		}
    },
    render (createElement) {
        const children = []
        children.push(
            createElement('b-navbar-brand', this.logoText)
        )
        if (this.collapsable) {
            children.push(
                createElement('b-navbar-toggle', {
                    props: {
                        target: "nav-collapse"
                    }
                })
            )
            const subMenuChildrens = []
            if (this.items.length > 0) {
                console.log(this.items)
                this.items.map((menuItem) => {
                    let dropDownChild = []
                    const { child } = menuItem
                    if (child) {
                        child.map((childItem) => {
                            dropDownChild.push(
                                createElement('b-dropdown-item', {
                                    props: {
                                        to: childItem.path ? { name: childItem.path } : '',
                                        disabled: childItem.path ? this.$route.name === childItem.path : false
                                    }
                                }, childItem.title)
                            )
                        })
                    }
                    let props = {}
                    let element = 'b-nav-item'
                    if (dropDownChild.length > 0) {
                        element = 'b-nav-item-dropdown'
                        props = {
                            text: menuItem.title
                        }
                        subMenuChildrens.push(
                            createElement(element, {
                                props: props
                            }, dropDownChild)
                        )
                    } else {
                        props = {
                            to: menuItem.path ? { name: menuItem.path } : '#',
                            disabled: menuItem.path ? this.$route.name === menuItem.path : false
                        }
                        subMenuChildrens.push(
                            createElement(element, {
                                props: props
                            }, menuItem.title, dropDownChild)
                        )
                    }
                })
            }
            children.push(
                createElement('b-collapse', {
                    props: {
                        isNav: true
                    },
                    attrs: {
                        id: 'nav-collapse'
                    }
                }, [
                    createElement('b-navbar-nav', {
                        class: {
                            'ml-auto': true
                        }
                    }, subMenuChildrens)
                ])
            )
        }
        return createElement('b-navbar', {
            props: {
                toggleable: "lg",
                type: "dark",
				fixed: this.fixed,
				sticky: this.sticky
            },
            class: {
                'top-bar': true
            }
        }, children)
    }
}
</script>
<style lang="scss">
@import '../assets/scss/navbar';
</style>