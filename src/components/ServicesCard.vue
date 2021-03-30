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
            const cardElement = h('b-card', {
                props: {
                    title: el.title
                },
                scopedSlots: {
                    default: () => el.innerText
                }
            })
            return h('b-col', {
                props: {
                    col: 12,
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
