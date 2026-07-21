
const practiceAdd = (key, value) => {
    console.log('Adding a value to localStorage');
    
    if (!key || !value) {
        console.error('Error: Both key and value are required');
        return false;
    }
    
    try {
        // Convert non-string values to JSON strings
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
        
        // Try to parse JSON, but return as-is if it's plain text
        try {
            const parsedValue = JSON.parse(value);
            console.log(`✅ Found: ${key} =`, parsedValue);
            return parsedValue;
        } catch {
            // Not JSON, return as string
            console.log(`✅ Found: ${key} = ${value}`);
            return value;
        }
    } catch (error) {
        console.error('Failed to retrieve data:', error.message);
        return null;
    }
};

// ============================================
// 4. VIEW ALL data (Traversal)
// ============================================
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
        
        // Try to parse JSON for pretty display
        let displayValue = value;
        try {
            const parsed = JSON.parse(value);
            displayValue = parsed;
        } catch {
            // Keep as string
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


console.log("🚀 STARTING TESTS\n");

// Add data (Notice: Age is stored as JSON string)
practiceAdd("FirstName", "John");
practiceAdd("Age", 18);           // Gets converted to "18"
practiceAdd("Ismarried", "false");  // Gets converted to "false"
practiceAdd("height", 167);       // Gets converted to "167"

console.log("\n--- After adding ---");
viewAllData();  // See ALL data

console.log("\n--- Reading specific keys ---");
console.log("Age:", getPractice("Age"));           // Returns 18 (number)
console.log("Ismarried:", getPractice("Ismarried")); // Returns false (boolean)

console.log("\n--- Deleting FirstName ---");
deletePractice("FirstName");

console.log("\n--- After deletion ---");
viewAllData();

console.log("\n--- Trying to get deleted key ---");
getPractice("FirstName");  // Shows warning

// Uncomment to clear everything
// clearAllData();