const sqlite3 = require('sqlite3').verbose();
const productArray = [];

// Veritabanı bağlantısını oluştur
let db = new sqlite3.Database('./matrix.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');


    // Veri ekleme fonksiyonu
function addProduct(productData){
  const { name, price, imageUrl, productDetail } = productData;
   db.run(`INSERT INTO products(name, price, imageUrl, productDetail) VALUES(?, ?, ?, ?)`,
          [name, price, imageUrl, productDetail],
          function(err) {
              if (err) {
                  return console.error(err.message);
              }
              console.log(`A row has been inserted with rowid ${this.lastID}`);
          });
};
module.exports=addProduct;

    // Örnek bir ürün ekleyelim
    const sampleProduct = {
      name: 'Example Product',
      price: 19.99,
      imageUrl: 'example.jpg',
      productDetail: 'This is an example product.'
    };

    // Ürün ekleme fonksiyonunu çağır
      // addProduct(sampleProduct);



    // Veri silme fonksiyonu
    function deleteProduct(productId) {
      db.run(`DELETE FROM products WHERE id = ?`, [productId], function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Product with ID ${productId} has been deleted`);
      });
    }
    module.exports=deleteProduct;


    // Örnek olarak bir ürün silme işlemi gerçekleştirelim
    const productIdToDelete = 7; // Silmek istediğiniz ürünün ID'sini belirtin
    // deleteProduct(productIdToDelete);



    // Veri güncelleme fonksiyonu
    function updateProduct(productId, updatedData) {
      const { name, price, imageUrl, productDetail } = updatedData;
      db.run(`UPDATE products SET name = ?, price = ?, imageUrl = ?, productDetail = ? WHERE id = ?`,
        [name, price, imageUrl, productDetail, productId],
        function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Product with ID ${productId} has been updated`);
      });
    }
    module.exports=updateProduct;


    // Örnek olarak bir ürün güncelleme işlemi gerçekleştirelim
    const productIdToUpdate =7; // Güncellemek istediğiniz ürünün ID'sini belirtin
    const updatedProductData = {
      name: 'Updated Product Name',
      price: 29.99,
      imageUrl: 'updated.jpg',
      productDetail: 'This product has been updated.'
    };
    // updateProduct(productIdToUpdate, updatedProductData);







  // Verileri çek
  db.serialize(() => {
    db.each(`SELECT 
                p.id AS product_id,
                p.name AS product_name,
                p.price AS product_price,
                p.imageUrl AS product_imageUrl,
                p.productDetail AS product_productDetail,
                GROUP_CONCAT(c.id) AS comment_ids,
                GROUP_CONCAT(c.text) AS comment_texts
            FROM 
                products p
            LEFT JOIN 
                comments c ON p.id = c.productId
            GROUP BY
                p.id;`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
       console.log(row);
      productArray.push(row);
    });


    // Veritabanı bağlantısını kapat
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      else {
        console.log('Close the database connection.');
      }
    });
  });
});

module.exports = productArray;
