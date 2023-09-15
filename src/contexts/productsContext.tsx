import React, { useState } from "react";

const ProductContext = React.createContext(undefined)
function ProductProvider({ children }: any) {

	const [currentCategory, setCurrentCategory] = useState<string>('');
	const [searchCategory, setSearchCategory] = useState<string>('')
	const [categories, setCategories] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false);
	const [categoryName, setCategoryName] = useState<string>('')
	const [categoryId, setCategoryId] = useState<number>()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [newCategory, setNewCategory] = useState<any>([])

	return (
		<ProductContext.Provider value={{
			currentCategory, setCurrentCategory,
			searchCategory, setSearchCategory,
			categories, setCategories,
			loading, setLoading,
			categoryName, setCategoryName,
			categoryId, setCategoryId,
			errorMessage, setErrorMessage,
			newCategory, setNewCategory,
		}}>
			{children}
		</ProductContext.Provider>
	);
}

const useProduct = () => React.useContext(ProductContext)

export { ProductProvider, useProduct }
