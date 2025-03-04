// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// // import { getAuth } from "firebase/auth";
// import {
//     getDatabase,
//     ref,
//     onValue,
//     set,
//     push,
//     remove,
//     update,
// } from "firebase/database";
// // import { auth } from "./firebaseConfig";
// import { auth } from "../firebaseConfig";
// import { useNavigate } from "react-router-dom";

// // import { getFirestore } from "firebase/firestore";
// import "./AdminPage.css";

// // Firebase Configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAvEAQJtn5GWly4E4SY3kXnbFPwPnwMlsk",
//     authDomain: "game-7c76e.firebaseapp.com",
//     projectId: "game-7c76e",
//     storageBucket: "game-7c76e.firebasestorage.app",
//     messagingSenderId: "98663584833",
//     appId: "1:98663584833:web:42e7831cf6928902c622c0",
//     databaseURL: "https://game-7c76e-default-rtdb.firebaseio.com",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// // export const auth = getAuth(app);
// // export const db = getFirestore(app);

// const Admin = () => {
//     const [games, setGames] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [gameData, setGameData] = useState({
//         description: "",
//         gameCategory: "",
//         gameImage: "",
//         gameTitle: "",
//         gameUrl: "",
//         slug: "",
//         metaUrl: "",
//         view: 0,
//     });
//     const [categoryData, setCategoryData] = useState({
//         categoryName: "",
//         categoryDescription: "",
//     });
//     const [editingGameId, setEditingGameId] = useState(null);
//     const [editingCategoryId, setEditingCategoryId] = useState(null);

//     // Fetch games and categories from Firebase in real-time
//     useEffect(() => {
//         const gamesRef = ref(database, "games");
//         const categoriesRef = ref(database, "categories");

//         // Fetch games
//         onValue(gamesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const gameList = Object.keys(data).map((key) => ({
//                     id: key,
//                     ...data[key],
//                 }));
//                 setGames(gameList);
//             } else {
//                 setGames([]);
//             }
//         });

//         // Fetch categories
//         onValue(categoriesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const categoryList = Object.keys(data).map((key) => ({
//                     id: key,
//                     ...data[key],
//                 }));
//                 setCategories(categoryList);
//             } else {
//                 setCategories([]);
//             }
//         });
//     }, []);

//     // Handle Input Changes for Game and Category
//     const handleGameChange = (e) => {
//         setGameData({ ...gameData, [e.target.name]: e.target.value });
//     };

//     const handleCategoryChange = (e) => {
//         setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
//     };

//     // Add or Update Game
//     const handleAddOrUpdateGame = () => {
//         if (editingGameId) {
//             handleUpdateGame();
//             return;
//         }

//         const newGameRef = push(ref(database, "games"));
//         set(newGameRef, { ...gameData, view: Number(gameData.view) })
//             .then(() => {
//                 alert("Game added successfully!");
//                 setGameData({
//                     description: "",
//                     gameCategory: "",
//                     gameImage: "",
//                     gameTitle: "",
//                     gameUrl: "",
//                     slug: "",
//                     metaUrl: "",
//                     view: 0,
//                 });
//             })
//             .catch((error) => console.error("Add failed: ", error));
//     };

//     // Update Game
//     const handleUpdateGame = () => {
//         if (!editingGameId) return;

//         const gameRef = ref(database, `games/${editingGameId}`);
//         update(gameRef, gameData)
//             .then(() => {
//                 alert("Game updated successfully!");
//                 setEditingGameId(null);
//                 setGameData({
//                     description: "",
//                     gameCategory: "",
//                     gameImage: "",
//                     gameTitle: "",
//                     gameUrl: "",
//                     slug: "",
//                     metaUrl: "",
//                     view: 0,
//                 });
//             })
//             .catch((error) => console.error("Update failed: ", error));
//     };

//     // Delete Game
//     const handleDeleteGame = (gameId) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this game?"
//         );
//         if (!confirmDelete) return;

//         const gameRef = ref(database, `games/${gameId}`);
//         remove(gameRef)
//             .then(() => {
//                 alert("Game deleted successfully!");
//                 setGames((prevGames) =>
//                     prevGames.filter((game) => game.id !== gameId)
//                 );
//             })
//             .catch((error) => {
//                 console.error("Delete failed: ", error);
//                 alert("Failed to delete the game. Check console for errors.");
//             });
//     };

//     // Set game data for updating
//     const handleEditGame = (game) => {
//         setGameData({
//             gameTitle: game.gameTitle,
//             description: game.description,
//             gameCategory: game.gameCategory,
//             gameImage: game.gameImage,
//             gameUrl: game.gameUrl,
//             slug: game.slug,
//             metaUrl: game.metaUrl,
//             view: game.view,
//         });
//         setEditingGameId(game.id);
//     };

//     // Add New Category
//     const handleAddCategory = () => {
//         if (editingCategoryId) {
//             handleUpdateCategory();
//             return;
//         }

//         const newCategoryRef = push(ref(database, "categories"));
//         set(newCategoryRef, categoryData)
//             .then(() => {
//                 alert("Category added successfully!");
//                 setCategoryData({
//                     categoryName: "",
//                     categoryDescription: "",
//                 });
//             })
//             .catch((error) => console.error("Add category failed: ", error));
//     };

//     // Update Category
//     const handleUpdateCategory = () => {
//         if (!editingCategoryId) return;

//         const categoryRef = ref(database, `categories/${editingCategoryId}`);
//         update(categoryRef, categoryData)
//             .then(() => {
//                 alert("Category updated successfully!");
//                 setEditingCategoryId(null);
//                 setCategoryData({
//                     categoryName: "",
//                     categoryDescription: "",
//                 });
//             })
//             .catch((error) => console.error("Update category failed: ", error));
//     };

//     // Delete CategorysetCategories
//     const handleDeleteCategory = (categoryId) => {
//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this category?"
//         );
//         if (!confirmDelete) return;

//         const categoryRef = ref(database, `categories/${categoryId}`);
//         remove(categoryRef)
//             .then(() => {
//                 alert("Category deleted successfully!");
//                 setCategories((prevCategories) =>
//                     prevCategories.filter(
//                         (category) => category.id !== categoryId
//                     )
//                 );
//             })
//             .catch((error) => console.error("Delete category failed: ", error));
//     };

//     // Set category data for updating
//     const handleEditCategory = (category) => {
//         setCategoryData({
//             categoryName: category.categoryName,
//             categoryDescription: category.categoryDescription,
//         });
//         setEditingCategoryId(category.id);
//     };

//     const navigate = useNavigate();

//     const handleLogout = () => {
//         auth.signOut();
//         navigate("/");
//     };
//     return (
//         <div className="admin-container">
//             <h2>Admin Panel - Manage Games & Categories</h2>

//             {/* Game Add/Edit Form */}
//             <div>
//                 <h3>{editingGameId ? "Update Game" : "Add New Game"}</h3>
//                 <input
//                     type="text"
//                     name="gameTitle"
//                     value={gameData.gameTitle}
//                     onChange={handleGameChange}
//                     placeholder="Game Title"
//                 />
//                 <input
//                     type="text"
//                     name="description"
//                     value={gameData.description}
//                     onChange={handleGameChange}
//                     placeholder="Description"
//                 />
//                 <input
//                     type="text"
//                     name="gameCategory"
//                     value={gameData.gameCategory}
//                     onChange={handleGameChange}
//                     placeholder="Category"
//                 />
//                 <input
//                     type="text"
//                     name="gameImage"
//                     value={gameData.gameImage}
//                     onChange={handleGameChange}
//                     placeholder="Image URL"
//                 />
//                 <input
//                     type="text"
//                     name="gameUrl"
//                     value={gameData.gameUrl}
//                     onChange={handleGameChange}
//                     placeholder="Game URL"
//                 />
//                 <input
//                     type="text"
//                     name="slug"
//                     value={gameData.slug}
//                     onChange={handleGameChange}
//                     placeholder="Slug"
//                 />
//                 <input
//                     type="text"
//                     name="metaUrl"
//                     value={gameData.metaUrl}
//                     onChange={handleGameChange}
//                     placeholder="Meta URL"
//                 />
//                 <input
//                     type="number"
//                     name="view"
//                     value={gameData.view}
//                     onChange={handleGameChange}
//                     placeholder="Views"
//                 />

//                 <button onClick={handleAddOrUpdateGame}>
//                     {editingGameId ? "Save Changes" : "Add Game"}
//                 </button>
//                 <button onClick={handleLogout}>Logout</button>
//             </div>

//             {/* Categories Table */}
//             <h3>Categories</h3>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Category Name</th>
//                         <th>Description</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {categories.map((category) => (
//                         <tr key={category.id}>
//                             <td>{category.categoryName}</td>
//                             <td>{category.categoryDescription}</td>
//                             <td>
//                                 <button
//                                     onClick={() =>
//                                         handleDeleteCategory(category.id)
//                                     }
//                                     style={{ color: "red", marginRight: "5px" }}
//                                 >
//                                     Delete
//                                 </button>
//                                 <button
//                                     onClick={() => handleEditCategory(category)}
//                                     style={{ color: "blue" }}
//                                 >
//                                     Update
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Games Table */}
//             <h3>Games</h3>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Description</th>
//                         <th>Category</th>
//                         <th>Image</th>
//                         <th>URL</th>
//                         <th>Slug</th>
//                         <th>Meta URL</th>
//                         <th>Views</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {games.map((game) => (
//                         <tr key={game.id}>
//                             <td>{game.gameTitle}</td>
//                             <td>{game.description}</td>
//                             <td>{game.gameCategory}</td>
//                             <td>
//                                 <img
//                                     src={game.gameImage}
//                                     alt={game.gameTitle}
//                                     width="50"
//                                 />
//                             </td>
//                             <td>
//                                 <a
//                                     href={game.gameUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     Play
//                                 </a>
//                             </td>
//                             <td>{game.slug}</td>
//                             <td>
//                                 <a
//                                     href={game.metaUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     Meta
//                                 </a>
//                             </td>
//                             <td>{game.view}</td>
//                             <td>
//                                 <button
//                                     onClick={() => handleDeleteGame(game.id)}
//                                     style={{ color: "red", marginRight: "5px" }}
//                                 >
//                                     Delete
//                                 </button>
//                                 <button
//                                     onClick={() => handleEditGame(game)}
//                                     style={{ color: "blue" }}
//                                 >
//                                     Update
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Admin;


// /* Admin Panel Styles */
// .admin-container {
//     max-width: 1200px;
//     margin: 20px auto;
//     padding: 20px;
//     background: #f9f9f9;
//     border-radius: 10px;
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//     font-family: Arial, sans-serif;
// }

// h2,
// h3 {
//     text-align: center;
//     color: #333;
// }

// /* Layout for Add Game & Add Category Forms */
// .admin-content {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//     margin-bottom: 20px;
// }

// /* Game and Category Forms */
// .form-container {
//     width: 45%;
//     background: white;
//     padding: 15px;
//     border-radius: 8px;
//     box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
// }

// .left {
//     align-self: flex-start;
// }

// .right {
//     align-self: flex-end;
// }

// input[type="text"],
// input[type="number"] {
//     width: 100%;
//     padding: 10px;
//     margin: 8px 0;
//     border: 1px solid #ccc;
//     border-radius: 5px;
// }

// button {
//     padding: 10px 15px;
//     margin: 10px 5px;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     font-size: 16px;
// }

// button:hover {
//     opacity: 0.9;
// }

// button[style*="color: red"] {
//     background: #ff4d4d;
//     color: white;
// }

// button[style*="color: blue"] {
//     background: #4da6ff;
//     color: white;
// }

// /* Center Games Table */
// .games-container {
//     width: 100%;
//     margin-top: 30px;
// }

// /* Table Styling */
// table {
//     width: 100%;
//     border-collapse: collapse;
//     margin-top: 20px;
//     background: white;
//     border-radius: 5px;
//     overflow: hidden;
//     box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
// }

// table,
// th,
// td {
//     border: 1px solid #ddd;
// }

// th,
// td {
//     padding: 12px;
//     text-align: left;
// }

// th {
//     background: #4caf50;
//     color: white;
// }

// td img {
//     width: 50px;
//     height: auto;
//     border-radius: 5px;
// }
