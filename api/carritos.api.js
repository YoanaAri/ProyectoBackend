const fs = require('fs');

class ProductManager{

    constructor(fileName){
        this.path = fileName;
    };

    async getAll(){
        try{
            if(fs.existsSync(this.path, 'utf8')){
                let products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            }else{
                return [];
            }

        }catch(error){
            console.log(error);
        }
    };

    async save(data){
        try{
            let products = await this.getAll();
            if (products.length === 0) {
                data['id'] = 1;
            }else{
                data['id'] = products[products.length - 1]['id'] + 1;  
            }            
            products.push(data);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return data.id;
        }catch(error){
            console.log(error);
        }
    };

    async getById(id){
        try{
            let products = await this.getAll();
            let myProduct = products.find((product) => product.id == id);
            if(myProduct != null){
                return myProduct;
            }else{
                console.log('Producto no encontrado');
                return null;
            }
        }catch(error){
            console.log(error);
        }
    };

    async updateProducts(data){
        try{
            let carts = await this.getAll();
            let myCart = carts.find((cart) => cart.id === data.id);
            if(myCart != null){
                myCart.products = data.products;
                myCart.quantity = data.quantity;
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            }
        } catch(error){
            console.log(error);
        }
    };

    async deleteById(id){
        try{
            let products = await this.getAll();
            let myProduct = products.find(product => product['id'] === id);
            if(myProduct!= null){
                products.splice(products.indexOf(myProduct), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            }
        }catch(error){
            console.log(error);
        }
    };

    async productExists(idProd){
        try{
            if(fs.existsSync('./models/products.json')){
                const dataProducts = JSON.parse(await fs.promises.readFile('./models/products.json','utf-8'));
                let product = null;
                if(dataProducts.length>0){
                    product = dataProducts.find((produ) => produ.id === parseInt(idProd));
                }
                if (product != null){
                    return true;
                }
                return false;
            }
        }catch(err){
            console.log(err);
        }
    }
};

let container = new ProductManager('./models/carritos.json');

const createCarrito = (req, res) => {
    container.getAll().then(() =>{
        const newCarrito = {
            products: [],
        }
        container.save(newCarrito).then(cid => container.getById(cid).then(mycarrito => res.json(mycarrito)));
    });
};

const showProducts = (req, res) => {
    let { cid } = req.params;
    container.getById(parseInt(cid)).then(myCarrito => res.json(myCarrito.products));
};

const addProduct = (req, res) => {
    let { cid, pid } = req.params;
    container.productExists(pid).then((exist) => {
        if(exist){
            let cant = 1;
            let myProduct ={
                idProd: pid,
                quantity: cant,
            };
            container.getById(parseInt(cid)).then((myCarrito) => {
                let product = myCarrito.products.find((prod) => prod.idProd === pid);
                if (product != null) {
                    product.quantity ++;
                }else{
                    myCarrito.products.push(myProduct);
                }
                container.updateProducts(myCarrito).then((() => container.getById(cid))).then(myCarrito => res.json(myCarrito.products));

            });
        };
    })
    container.getById(cid).then(myCarrito => res.json(myCarrito.products));
};

module.exports = { createCarrito, showProducts, addProduct }; 