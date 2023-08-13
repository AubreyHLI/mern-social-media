
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SERVER_URL } from './static/server';
import axios from 'axios';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import BookmarksPage from './pages/BookmarksPage';
import ProfilePage from './pages/ProfilePage';
import FollowingsPage from './pages/FollowingsPage';
import FollowersPage from './pages/FollowersPage';
import AuthProtectedRoute from './pages/AuthProtectedRoute';
import CommonLayout from './components/Layout/CommonLayout';
import NotificationPage from './pages/NotificationPage';


function App() {

	//axios defaults
	const token = useSelector(state => state.auth.token);
	axios.defaults.baseURL = `${SERVER_URL}/`;
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	axios.defaults.withCredentials = true;


	return (
	<BrowserRouter>
		<div className="app h-full w-full min-h-full min-w-[320px] max-w-[1350px] my-0 mx-auto">
			<Routes>
				<Route path='/' element={<AuthProtectedRoute><CommonLayout /></AuthProtectedRoute>}>
					<Route index element={<Home />} />
					<Route path='post/:postId' element={<PostPage />} />
					<Route path='notifications' element={<NotificationPage />}/>
					<Route path='bookmarks' element={<BookmarksPage />}/>
					<Route path='profile/:profileId' element={<ProfilePage />}>
						<Route path='followings' element={<FollowingsPage />} />
						<Route path='followers' element={<FollowersPage />} />
					</Route>
				</Route>
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</div>
	</BrowserRouter>
	);
}

export default App;
