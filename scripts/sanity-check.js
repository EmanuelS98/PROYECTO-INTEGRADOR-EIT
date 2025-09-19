// Script de Sanity Check para el Proyecto Integrador EIT
// Ejecutar en la consola del navegador para verificar el estado del localStorage

const sanityCheck = () => {
    console.log('=== SANITY CHECK - PROYECTO INTEGRADOR EIT ===');
    console.log('Fecha:', new Date().toLocaleString());
    
    // Verificar productos
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    console.log('\n📦 PRODUCTOS:');
    console.log(`- Cantidad total: ${products.length}`);
    console.log(`- Estado: ${products.length >= 20 ? '✅ OK (≥20)' : '❌ FALTA (necesita 20)'}`);
    
    if (products.length > 0) {
        console.log(`- Primer producto: ${products[0].name}`);
        console.log(`- Último producto: ${products[products.length - 1].name}`);
    }
    
    // Verificar carrito
    const cart = JSON.parse(localStorage.getItem('shopping-cart') || '{}');
    console.log('\n🛒 CARRITO:');
    console.log(`- Artículos: ${cart.articles?.length || 0}`);
    console.log(`- Total cantidad: ${cart.totalQuantity || 0}`);
    console.log(`- Total monto: $${cart.totalAmount?.toFixed(2) || '0.00'}`);
    
    // Verificar compras
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    console.log('\n💳 COMPRAS:');
    console.log(`- Compras registradas: ${purchases.length}`);
    
    if (purchases.length > 0) {
        const lastPurchase = purchases[purchases.length - 1];
        console.log(`- Última compra: ${new Date(lastPurchase.date).toLocaleString()}`);
        console.log(`- Monto última compra: $${lastPurchase.totalAmount?.toFixed(2)}`);
    }
    
    // Verificar institución
    const institution = JSON.parse(localStorage.getItem('institution') || '{}');
    console.log('\n🏢 INSTITUCIÓN:');
    console.log(`- Nombre: ${institution.name || 'No configurado'}`);
    console.log(`- Estado: ${institution.name ? '✅ Configurado' : '⚠️ Sin configurar'}`);
    
    // Resumen
    console.log('\n📊 RESUMEN:');
    const allGood = products.length >= 20 && cart.articles?.length >= 0;
    console.log(`Estado general: ${allGood ? '✅ TODO OK' : '⚠️ REVISAR'}`);
    
    if (!allGood) {
        console.log('\n🔧 ACCIONES RECOMENDADAS:');
        if (products.length < 20) {
            console.log('- Recargar la página para generar productos de ejemplo');
        }
    }
    
    return {
        products: products.length,
        cartItems: cart.articles?.length || 0,
        purchases: purchases.length,
        institution: !!institution.name,
        allGood
    };
};

// Función para limpiar datos de prueba
const clearTestData = () => {
    if (confirm('¿Estás seguro de que quieres limpiar todos los datos de prueba?')) {
        localStorage.removeItem('products');
        localStorage.removeItem('shopping-cart');
        localStorage.removeItem('purchases');
        console.log('✅ Datos de prueba eliminados');
        console.log('Recarga la página para regenerar los datos');
    }
};

// Función para generar datos de prueba
const generateTestData = () => {
    console.log('🔄 Generando datos de prueba...');
    
    // Limpiar datos existentes
    localStorage.removeItem('products');
    localStorage.removeItem('shopping-cart');
    localStorage.removeItem('purchases');
    
    // Recargar página para regenerar productos
    window.location.reload();
};

// Exportar funciones para uso en consola
window.sanityCheck = sanityCheck;
window.clearTestData = clearTestData;
window.generateTestData = generateTestData;

console.log('🔧 Funciones disponibles:');
console.log('- sanityCheck() - Ejecutar verificación completa');
console.log('- clearTestData() - Limpiar datos de prueba');
console.log('- generateTestData() - Regenerar datos de prueba');

// Ejecutar automáticamente
sanityCheck();
