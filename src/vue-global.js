import BasicFooter from './components/basic-footer'
// import moment from 'moment'

class GlobalComponents {
    init (vm) {
        this.vm = vm
        this.registerComponent()
        this.registerFilter()
        this.registerDirective()
    }

    registerComponent () {
        this.vm.component(BasicFooter.name, BasicFooter)
    }

    registerMixins () {
    }

    registerFilter () {
        // // 格式化时间
        // this.vm.filter('formatDate', function (value, formatter = 'YYYY-MM-DD HH:mm:ss', isUnix = false) {
        //     if (!value) {
        //         return ''
        //     }
        //     if (isUnix) {
        //         return moment.unix(value).format(formatter)
        //     }
        //     return moment(value).format(formatter)
        // })
    }

    registerDirective () {
    }
}

export default new GlobalComponents()
