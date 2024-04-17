import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js"; 

const addProduct = asyncHandler(async (req, res) => {
    const { prodName, prodImages, prodPrice, prodDesc, category, keywords, brand, attributes} = req.body;

    // Validate required fields
    if (!prodName || !prodPrice || !prodDesc || !category || !brand) {
        return res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
    }

    // Validate image
    if (!Array.isArray(prodImages) || prodImages.length === 0) {
        return res.status(400).json(new ApiResponse(400, {}, "At least one image is required"));
    }

    try {
        // Find or create category
        let categoryName = await Category.findOneAndUpdate(
            { name: category.toLowerCase() },
            { name: category.toLowerCase() },
            { upsert: true, new: true }
        );

        // Create product
        const product = await Product.create({
            prodName,
            prodImages,
            prodPrice,
            prodDesc,
            seller: req.user._id,
            prodCategory: categoryName._id,
            keywords,
            brand,
            attributes
        });

        // Update user's products field with the ID of the newly created product
        await User.findByIdAndUpdate(req.user._id, { $push: { products: product._id } });

        return res.status(200).json(new ApiResponse(200, product, "Product added successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
    }
});

const getProducts = asyncHandler(async (_, res) =>{
    const products = await Product.find();
    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

const selllerProducts =  asyncHandler(async(req,res) =>{
    const products = await Product.find({seller:req.user._id});
    return res.status(200).json(new ApiResponse(200, products, "Seller Products fetched successfully"));
});

const getProduct = asyncHandler(async (req, res) =>{
    const id = req.params.id;
    const product = await Product.findById(id); // Remove the curly braces around _id
    if(!product){
        return res.status(400).json(new ApiResponse(400, {}, "Product Not Found"));
    }
    return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});

const getCategory = asyncHandler(async (req, res) =>{
    const id = req.params.id;
    const category = await Category.findById(id); // Remove the curly braces around _id
    if(!category){
        return res.status(400).json(new ApiResponse(400, {}, "Category Not Found"));
    }
    return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
});


const updateProduct = asyncHandler(async (req, res) =>{
    const productId = req.params.id;
    const { prodName, prodImages, prodPrice, prodDesc, prodCategory, keywords, brand} = req.body;

    // Validate required fields
    if (!prodName || !prodPrice || !prodDesc || !prodCategory || !brand) {
        return res.status(400).json(new ApiResponse(400, {}, "All fields are required"));
    }

    // Validate image
    if (!Array.isArray(prodImages) || prodImages.length === 0) {
        return res.status(400).json(new ApiResponse(400, {}, "At least one image is required"));
    }

    let categoryName = await Category.findOneAndUpdate(
        { name: prodCategory.toLowerCase() },
        { name: prodCategory.toLowerCase() },
        { upsert: true, new: true }
    );

    const options = { new: true }; 

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        prodName,
        prodImages,
        prodPrice,
        prodDesc,
        prodCategory: categoryName._id,
        keywords,
        brand
    }, options);

    if (!updatedProduct) {
      return res.status(400).json(new ApiResponse(400, {}, "Product Not Found"));
    }

    return res.status(200).json(new ApiResponse(200, updatedProduct, "Products updated successfully"));
});

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
  
    // Delete the product from the database
    const deletedProduct = await Product.findByIdAndDelete(productId);
  
    if (!deletedProduct) {
      return res.status(404).json(new ApiResponse(404, {}, "Product not found"));
    }
  
    // Find the user who owns the product and remove the product ID from their products array
    const sellerId = deletedProduct.seller; // Assuming you have a userId field in your product schema
    const user = await User.findById(sellerId);
  
    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }
  
    user.products = user.products.filter((id) => id.toString() !== productId);
  
    await user.save();
  
    return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
  });

const addToWishlist = asyncHandler(async(req, res) => {

    let {id} =  req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(id);
    if(isLiked){
        await User.findByIdAndUpdate(req.user._id , {$pull: {wishList : id} })
    }else{
        await User.findByIdAndUpdate(req.user._id , {$addToSet: {wishList : id} })
    }
    return res.status(200).json(new ApiResponse(200, {}, "Ok"))
})

const isLiked = asyncHandler(async(req, res) => {

    let {id} =  req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(id);
    if(isLiked){
        return res.status(200).json(true)
    }
    return res.status(200).json(false)
})

// const addToCart = asyncHandler(async(req, res) => {
//     let {id} =  req.params;
//     let user = req.user;
//     let inCart = user.cart.includes(id);
//     if(inCart){
//         await User.findByIdAndUpdate(req.user._id , {$pull: {cart : id} })
//     }else{
//         await User.findByIdAndUpdate(req.user._id , {$addToSet: {cart : id} })
//     }
//     return res.status(200).json(new ApiResponse(200, {}, "Ok"))
// })
// const cartProducts = asyncHandler(async(req, res) => { 
//     const cart = req.body
//     const products = await Product.find({ _id: { $in: cart } });
//     return res.status(200).json(new ApiResponse(200, products, "Ok"))
// })

const addToCart = asyncHandler(async(req, res) => {
    const productId = req.params.id;
    const userId = req.user._id;

    // Check if the product already exists in the user's cart
    const user = await User.findById(userId);
    const existingProductIndex = user.cart.findIndex(item => item.product.equals(productId));

    if (existingProductIndex !== -1) {
        // If product exists, increment its quantity
        user.cart[existingProductIndex].quantity++;
    } else {
        // If product does not exist, add it to the cart with quantity 1
        user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    return res.status(200).json(new ApiResponse(200, {}, "Product added to cart successfully"));
});

const cartProducts = async (req, res) => {
    try {
        const { cart } = req.user;

        // Fetch products based on the IDs in the user's cart
        const productsWithQuantity = await Promise.all(cart.map(async cartItem => {
            const product = await Product.findById(cartItem.product);
            if (!product) {
                return null; // Handle case where product is not found
            }
            return {
                ...product.toObject(),
                quantity: cartItem.quantity
            };
        }));

        // Filter out null values (products not found)
        const validProducts = productsWithQuantity.filter(product => product !== null);

        return res.status(200).json(new ApiResponse(200, validProducts, "Products from cart successfully fetched"));
    } catch (error) {
        console.error("Error fetching cart products:", error);
        return res.status(500).json({ message: 'Could not fetch cart products', error: error.message });
    }
};



const removeFromCart = asyncHandler(async(req, res) => {
    const productId = req.params.id;
    const userId = req.user._id;

    // Find the user by ID
    const user = await User.findById(userId);

    // Find the index of the product in the user's cart
    const index = user.cart.findIndex(item => item.product.equals(productId));

    if (index !== -1) {
        // If the product is found, remove it from the cart
        user.cart.splice(index, 1);
        await user.save();
        return res.status(200).json(new ApiResponse(200, {}, "Product removed from cart successfully"));
    } else {
        // If the product is not found in the cart, return an error response
        return res.status(404).json(new ApiResponse(404, {}, "Product not found in cart"));
    }
});


// Controller to update the quantity of a product in the user's cart
const updateCartProductQuantity = asyncHandler(async (req, res) => {
    try {
      const { productId, quantity } = req.body; // Assuming productId and quantity are sent in the request body
  
      // Find the user by ID and update the quantity of the specified product in the cart
      const user = await User.findById(req.user._id);
      const cartProductIndex = user.cart.findIndex(item => item.product.toString() === productId);
      if (cartProductIndex !== -1) {
        user.cart[cartProductIndex].quantity = quantity;
        await user.save();
  
        return res.status(200).json(new ApiResponse(200, {}, 'Cart product quantity updated successfully'));
      } else {
        return res.status(404).json(new ApiResponse(404, {}, 'Product not found in cart'));
      }
    } catch (error) {
      console.error('Error updating cart product quantity:', error);
      return res.status(500).json(new ApiResponse(500, {}, 'Internal server error'));
    }
  });


export { addProduct, getProducts, selllerProducts, getProduct, updateProduct, getCategory, deleteProduct, addToWishlist, isLiked, addToCart, cartProducts, removeFromCart, updateCartProductQuantity };
