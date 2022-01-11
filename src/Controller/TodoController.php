<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/todo', name: 'api_todo_')]
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
    public function index(): JsonResponse
    {
		$todos = $this->todoRepository->findAll();

		$arrayOfTodos = array_map(function ($todo) {
			return $todo->toArray();
		}, $todos);

		return $this->json($arrayOfTodos);
    }

	#[Route('/create', name: 'create')]
	public function create(Request $request): JsonResponse
	{
		$content = json_decode($request->getContent());

		$todo = new Todo();
		$todo->setName($content->name);

		try {
			$this->entityManager->persist($todo);
			$this->entityManager->flush();
			return $this->json([
				'todo' => $todo->toArray(),
			]);
		} catch (\Exception $e) {
			return $this->json([
				'error_code' => $e->getCode(),
				'message' => $e->getMessage(),
			]);
		}
	}
}
