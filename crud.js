
const practiceAdd = (key, value) => {
    console.log('Adding a value to localStorage');
    
    if (!key || !value) {
        console.error('Error: Both key and value are required');
        return false;
    }
    
    try {
        
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, stringValue);
        console.log(`✅ Successfully stored: ${key} = ${stringValue}`);
        return true;
    } catch (error) {
        console.error('Failed to store data:', error.message);
        return false;
    }
};


const deletePractice = (key) => {
    console.log("If you don't need this you can delete it");
    
    if (!key) {
        console.error('Error: Key is required for deletion');
        return false;
    }
    
    try {
        if (localStorage.getItem(key) !== null) {
            localStorage.removeItem(key);
            console.log(`✅ Successfully deleted: ${key}`);
            return true;
        } else {
            console.warn(`⚠️ Key "${key}" not found in localStorage`);
            return false;
        }
    } catch (error) {
        console.error('Failed to delete data:', error.message);
        return false;
    }
};


const getPractice = (key) => {
    console.log("🔍 Retrieving data from localStorage");
    
    if (!key) {
        console.error('Error: Key is required');
        return null;
    }
    
    try {
        const value = localStorage.getItem(key);
        
        if (value === null) {
            console.warn(`⚠️ Key "${key}" not found in localStorage`);
            return null;
        }
        
       
        try {
            const parsedValue = JSON.parse(value);
            console.log(`✅ Found: ${key} =`, parsedValue);
            return parsedValue;
        } catch {
            
            console.log(`✅ Found: ${key} = ${value}`);
            return value;
        }
    } catch (error) {
        console.error('Failed to retrieve data:', error.message);
        return null;
    }
};


const viewAllData = () => {
    console.log("📦 All data in localStorage:");
    console.log("=" .repeat(40));
    
    const allKeys = Object.keys(localStorage);
    
    if (allKeys.length === 0) {
        console.log("(Empty) - No data found");
        return;
    }
    
    allKeys.forEach(key => {
        const value = localStorage.getItem(key);
        
       
        let displayValue = value;
        try {
            const parsed = JSON.parse(value);
            displayValue = parsed;
        } catch {
            
        }
        
        console.log(`📌 ${key}:`, displayValue);
    });
    
    console.log("=" .repeat(40));
    console.log(`Total: ${allKeys.length} item(s)`);
};


const clearAllData = () => {
    const confirmClear = confirm("⚠️ Delete ALL localStorage data?");
    if (confirmClear) {
        localStorage.clear();
        console.log("🗑️ All data cleared!");
    } else {
        console.log("Clear operation cancelled");
    }
};


