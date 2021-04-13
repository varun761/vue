<script>
export default {
    name: 'ServiceCard',
    props: {
        sections: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    render(h) {
        const services = this.sections.map((el) => {
            const childElement = []
            const description = el.description || null
            const features = Object.prototype.hasOwnProperty.call(el, 'features') && el.features && Array.isArray(el.features) ? el.features : []
            if (description) {
                /*
                * Description
                */
                const descriptionElement = h('p', {
                    class: {
                        'font-weight-lighter': true,
                        'card-paragraph': true
                    },
                    domProps: {
                        innerHTML: el.description 
                    }
                })
                childElement.push(descriptionElement)
            }
            /*
            * Features
            */
            if (features) {
                const featuresList = []
                features.map((featureListElement) => h('li', {
                    domProps: {
                        innerHTML: featureListElement
                    }
                })).map((featureItems) => featuresList.push(featureItems))
                if (featuresList.length > 0) {
                    const featureList = h('ul', {
                        class: {
                            'feature-list': true 
                        }
                    }, featuresList)
                    childElement.push(featureList)
                }
            }
            /*
            * Card element
            */
            const cardElement = h('b-card', {
                props: {
                    title: el.title
                },
                class: {
                    serviceCard: true,
                    'text-center': true
                },
                scopedSlots: {
                    default: () => h('div', {}, [childElement])
                }
            })
            /*
            * Row
            */
            return h('b-col', {
                props: {
                    cols: 12,
                    sm: 6,
                    md: 4
                },
                class: {
                    'float-left': true,
                    'mb-4': true
                }
            }, [cardElement])
        })
        return h('div', { class: { 'w-100': true }}, services)
    }
}
</script>

<style lang="scss">
.serviceCard {
    border-color: #05386B;
    border-radius: 1rem;
    .card-title {
        color: #05386B;
    }
    .card-paragraph {
        font-size: 14px;
        line-height: 24px;
    }
    .feature-list {
        padding: 0;
        margin: 0;
        list-style: none;
        font-weight: lighter;
        line-height: 24px;
    }
}
</style>