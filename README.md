# CloudNativeInv
Inventory api for CN

## 1 MongoDB
connected!

## 2 Azure
- driftsätt

## 3 Node miljö

DONE
authentication

TODO
middleware som GETar alla warehouses namn och checkar om det är samma. return TRUE eller FALSE


## ERRORS
500 internal server error

API_URL https://sbb-inventory.azurewebsites.net/
(Order) authorization token: rcxST7guHCNT6p4ge6LXeIC7rVh6Ph

----------------------------------------------------

/warehouses

{
    "name": "Helsinki",
    "address": "Romgatan 5"
}

### Båda values måste vara unique

*** Endpoints (alla kräver authorization token) ***

### Få alla warehouses

	/GET
	{{baseURL}}/warehouses/

### Skapa ett nytt warehouse

	/POST
	{{baseURL}}/warehouses/

### Editera existerande warehouse 

	/PATCH
	{{baseURL}}/warehouses/_id

### Ta bort existerande warehouse

	/DELETE
	{{baseURL}}/warehouses/_id

------------------------------------------------------

/products

{
	"product": "customid56758r9347462358",
	"warehouses": [
		{
			"name":"Göteborg",
			"amount": 20
		},
		{
			"name": "Helsingfors",
			"amount": 31
		},
		{
			"name": "Vasa",
			"amount": 0
		}
	]
}


*** Endpoints (alla kräver authorization token) ***
*** I beta versionen kräver både post och patch att man har med alla warehouses i sin JSON req ***
*** Att endast posta eller patcha med ett warehouse objekt ger en error ***

### Hämta alla products

	/GET
	{{baseURL}}/products/

### Hämta specifik product

	/GET
	{{baseURL}}/products/_id

### Insert produkt

	/POST
	{{baseURL}}/products/

### Ändra en produkt

	/PATCH
	{{baseURL}}/products/_id

### Ta bort en produkt

	/DELETE
	{{baseURL}}/products/_id
