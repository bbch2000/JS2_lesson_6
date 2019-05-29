Vue.component ('products', {
    props: ['products', 'img'],
    template: `
        <div class="products">
            <product 
            v-for="product of products" 
            :key="product.id_product" 
            :img="img" 
            :product="product"></product>
        </div>
    `
});

Vue.component ('product', {
    props: ['product', 'img'],
    template: `
        <div class="product-item">
                <img :src='img' alt="">
                <h3>{{ product.product_name }}</h3>
                <h4>{{ product.price }}</h4>
                <button class='add' @click='$parent.$emit("add-product", product)'>Купить</button>
        </div>
    `
});

Vue.component ('basket', {
    props: ['cartitems','visibility'],
    template: `
        <div class="basket" v-show='visibility'>
            <backetitem
            v-for="product of cartitems" 
            :key="product.id_product" 
            :product="product"></backetitem>
        </div>
    `
});

Vue.component ('backetitem', {
    props: ['product'],
    template: `
            <div class="basket-item">
                    <h3> {{ product.product_name }} </h3>
                    <h4> Cтоимость: {{ product.price * product.quantity }} </h4>
                    <button class='remove' @click='$parent.$emit("remove", product)'>удалить</button>
            </div>
            `
});