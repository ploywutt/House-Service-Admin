import React, { useState } from "react";

const ProductContext = React.createContext(undefined)
function ProductProvider({ children }: any) {
	const [loading, setLoading] = useState<boolean>(false);
	
	// Category part
	const [currentCategory, setCurrentCategory] = useState<string>('');
	const [searchCategory, setSearchCategory] = useState<string>('')
	const [categories, setCategories] = useState<any[]>([])
	const [categoryName, setCategoryName] = useState<string>('')
	const [categoryId, setCategoryId] = useState<number>()
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [newCategory, setNewCategory] = useState<any>([])

	// Service part
	const [services, setServices] = useState<any[]>([])
	const [searchService, setSearchService] = useState<string>('')
	const [newService, setNewService] = useState<string>('')


	return (
		<ProductContext.Provider value={{
			loading, setLoading,
			errorMessage, setErrorMessage,
			
			//Category part
			currentCategory, setCurrentCategory,
			searchCategory, setSearchCategory,
			categories, setCategories,
			categoryName, setCategoryName,
			categoryId, setCategoryId,
			newCategory, setNewCategory,

			//Service part
			services, setServices,
			searchService, setSearchService,
			newService, setNewService
		}}>
			{children}
		</ProductContext.Provider>
	);
}

const useProduct = () => React.useContext(ProductContext)

export { ProductProvider, useProduct }
