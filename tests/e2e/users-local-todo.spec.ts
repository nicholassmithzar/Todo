import { expect, test } from '@playwright/test';

test.describe('Users local todo flow', () => {
  test('loads data, selects a user, and adds local todo at top', async ({ page }) => {
    await page.route('**/jsonplaceholder.typicode.com/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            name: 'Leanne Graham',
            email: 'leanne@example.com',
            phone: '1-770-736-8031',
            website: 'leanne.dev',
            company: { name: 'Romaguera-Crona' }
          },
          {
            id: 2,
            name: 'Ervin Howell',
            email: 'ervin@example.com',
            phone: '010-692-6593',
            website: 'ervin.dev',
            company: { name: 'Deckow-Crist' }
          }
        ])
      });
    });

    await page.route('**/jsonplaceholder.typicode.com/todos', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { userId: 1, id: 10, title: 'existing todo one', completed: false },
          { userId: 1, id: 11, title: 'existing todo two', completed: true },
          { userId: 2, id: 12, title: 'someone else todo', completed: false }
        ])
      });
    });

    await page.goto('/users');

    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
    await expect(page.getByTestId('users-table')).toBeVisible();

    await page.getByTestId('user-row-1').click();
    await expect(page.getByTestId('selected-user-detail')).toBeVisible();

    const todoInput = page.getByTestId('local-todo-input');
    await todoInput.fill('local todo created in e2e');

    await page.getByRole('button', { name: 'Add To-do' }).click();

    const todoItems = page.locator('.users__todos-list .users__todo-item');
    await expect(todoItems.first()).toContainText('local todo created in e2e');
    await expect(todoInput).toHaveValue('');
  });
});
