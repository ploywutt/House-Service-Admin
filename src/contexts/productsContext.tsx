import React, { useState } from "react";
import { ProductContextType } from "./productsContextType";

const ProductContext = React.createContext<ProductContextType | undefined>(undefined);
function ProductProvider({ children }: any) {
	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('')
	
	// Category part
	const [currentCategory, setCurrentCategory] = useState<string>('');
	const [searchCategory, setSearchCategory] = useState<string>('')
	const [categories, setCategories] = useState<any[]>([])
	const [newCategory, setNewCategory] = useState<any>([])

	// Service part
	const [services, setServices] = useState<any[]>([])
	const [searchService, setSearchService] = useState<string>('')
	const [newService, setNewService] = useState()
	const [fileList, setFileList] = useState<File[] | null>(null)
	const [formData, setFormData] = useState<object | null>(null)
  const [submitServiceInput, setSubmitServiceInput] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>('')
	const [blobImage, setBlobImage,] = useState<any>()

	return (
		<ProductContext.Provider value={{
			loading, setLoading,
			errorMessage, setErrorMessage,
			
			//Category part
			currentCategory, setCurrentCategory,
			searchCategory, setSearchCategory,
			categories, setCategories,
			newCategory, setNewCategory,

			//Service part
			services, setServices,
			searchService, setSearchService,
			newService, setNewService,
			fileList, setFileList,
			formData, setFormData,
			submitServiceInput, setSubmitServiceInput,
			imagePath, setImagePath,
			blobImage, setBlobImage,
		}}>
			{children}
		</ProductContext.Provider>
	);
}

const useProduct = () => React.useContext(ProductContext)

export { ProductProvider, useProduct }