<?php

namespace App\Controller;

use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/todo', name: 'todo_')]
class TodoController extends AbstractController
{
	private EntityManagerInterface $entityManager;
	private TodoRepository $todoRepository;

	public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
	{
		$this->entityManager = $entityManager;
		$this->todoRepository = $todoRepository;
	}

    #[Route('/read', name: 'read')]
    public function index()
    {
		$todos = $this->todoRepository->findAll();

		$arrayOfTodos = array_map(function ($todo) {
			return $todo->toArray();
		}, $todos);

		return $this->json($arrayOfTodos);
    }
}
