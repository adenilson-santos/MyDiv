class MyDiv {
    constructor (configs) {
        if(configs) {
            this._x = configs.x || 0
            this._y = configs.y || 0
            this._width = configs.width || 0
            this._height = configs.height || 0
            this._mainWidth = configs.width || 0
            this._mainHeight = configs.height || 0
            this._background = configs.background || '#333'
            this._container = configs.container || typeof(configs) != 'object' && configs
            this._count = 0
        }
        this._childSelector = 'my_div_main'
    }

    create () {
        let obj = document.createElement("div")
        obj.style.width = this.width
        obj.style.height = this.height
        obj.style.background = this.background
        obj.style.position = 'relative'

        this._initDiv(obj, false)

        return this
    }

    updateSize(size) {
        this.width = size.width ? size.width : this.width
        this.height = size.height ? size.height : this.height

        this.render()
    }

    render () {
        let mainDiv = document.querySelector('.my_div_main')
        mainDiv.style.width = this.width
        mainDiv.style.height = this.height

        this._setChildResponsivity()
        this._renderNewPosition()
    }

    _renderNewPosition(){
        Array.from(document.querySelector(`.${this._childSelector}`).children).map(child => {
            this._setChildPosition (child, { 
                center: child.dataset.center == '',
                width: this.removePrefix(child.style.width,'px'),
                height: this.removePrefix(child.style.height,'px')
            })
        })
    }

    _initDiv (obj, child){
        if (child) {
            obj.classList.add(`${this._childSelector}_${this._count}`)
            document.querySelector('.my_div_main').append(obj)
        } else {
            obj.classList.add(this._childSelector)
        
            try {
                document.querySelector(this.container).append(obj)
            } catch (err) {
                console.error('MyDiv Error: \n \n You need choose a valid selector in your MyDiv instance. \n \n Ex: new MyDiv(".selector")')
            }
        }
    }

    createChild (child) {
        let child_el = document.querySelector(`.${this._childSelector}_${this._count}`)

        if(child_el) {
            this._count++
        }

        this._createChildHtml(child)
    }   

    _createChildHtml (child) {
        let obj = document.createElement("div")
        obj.style.width = child.width || 0 
        obj.style.height = child.height || 0
        obj.style.background = child.background || '#fff'
        obj.style.position = 'absolute'
        if(child.responsive) obj.dataset.responsive = ''

        obj = this._setChildPosition(obj, child)

        this._initDiv(obj, true)
    }

    _setChildResponsivity() {
        Array.from(document.querySelectorAll('[data-responsive]')).map(child => {
            child.style.width   = this._calcNewChildWidth(child)
            child.style.height  = this._calcNewChildHeight(child)
        })
    }

    _calcNewChildWidth (child) {
        return this.removePrefix(child.style.width,'px') * this.width / this.mainWidth      
    }

    _calcNewChildHeight (child) {
        return this.removePrefix(child.style.height,'px') * this.height / this.mainHeight    
    }

    _setChildPosition (obj, child) {
        if (child.center) {
            obj.dataset.center  = ''
            obj.style.left      = (this.width/2) - (child.width/2) 
            obj.style.top       = (this.height/2) - (child.height/2) 
        } else {
            obj.style.left      = child.x || this._newX(obj)   || 0
            obj.style.top       = child.y || this._newY(obj)   || 0
        }

        return obj
    }

    _newX (obj) { 
        return this.removePrefix(obj.style.left,'px') * this.width / this.mainWidth 
    }
    _newY(obj) { 
        return this.removePrefix(obj.style.top,'px') * this.height / this.mainHeight 
    }

    removePrefix(data,prefix){
        return data.split(prefix)[0]
    }

    //accessors
    
    get x () {
        return this._x
    } 

    set x (x) {
        this._x = x
    }

    get y () {
        return this._y
    } 

    set y (y) {
        this._y = y
    }

    get width () {
        return this._width
    } 

    set width (width) {
        this._width = width
    }

    get height () {
        return this._height
    } 

    set height (height) {
        this._height = height
    }

    get mainWidth () {
        return this._mainWidth
    } 

    set mainWidth (width) {
        this._mainWidth = width
    }

    get mainHeight () {
        return this._mainHeight
    } 

    set mainHeight (height) {
        this._mainHeight = height
    }

    get background () {
        return this._background
    } 

    set background (background) {
        this._background = background
    }

    get container () {
        return this._container
    } 

    set container (container) {
        this._container = container
    }
}