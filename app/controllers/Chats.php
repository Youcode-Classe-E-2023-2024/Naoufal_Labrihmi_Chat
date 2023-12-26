<?php 

class Chats extends Controller
{
	private $userModel;
	public function __construct() {
		if (!isLoggedIn()) {
			redirect('users/login');
		}

		$this->userModel = $this->model('User');
	}

////////////////////////////////////////////////////////////////////////////////////////////////

	public function index($id)
	{
		$userToSend = $this->userModel->getUserById($id);
		
	  $this->view('chats/index', $userToSend);
	}

	
} // end class


