const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let app = new Vue ({
    el: '#app',
    data: {
        catalogURL: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/150x150',
        searchText:'',
        isVisibleCart: false,
        filtered: [],
        cartItems: []
    },
    methods: {
        getJSON(url) {
            return fetch(url)
                    .then (result => result.json())
                    .catch (error => {
                        console.log(error);
                    })
        },
        addProduct(product) {
            this.getJSON(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if(find){
                        find.quantity++;
                    } else {
                        let prod = Object.assign ({quantity: 1}, product);
                        this.cartItems.push(prod);
                        console.log(this.cartItems);
                        };
                }
            })
        },
        filterGoods() {
          this.filtered = this.filtered.filter(post => {
            return post.product_name.toLowerCase().includes(this.searchText.toLowerCase());
          });
        },
        remove(product) {
            this.getJSON(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                     if (product.quantity > 1) {
                         product.quantity --;
                     } else {
                         this.cartItems.splice (this.cartItems.indexOf(product), 1)
                     }
                }
            })
        } 
    },
    mounted() {
        this.getJSON(`${API + this.catalogURL}`)
        .then (data => {
            for (el of data) {
                this.products.push (el);
                this.filtered.push (el);
                console.log(this.filtered);
            }
        })  
    }
})


