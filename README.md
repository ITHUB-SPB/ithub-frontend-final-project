# ithub-frontend-vue-final-project

(контрольная точка №6)

## Задание

Реализовать приложение на основе следующего [макета](https://www.figma.com/design/EQC47Bzy09sBIVIj7iF3ij/%D0%98%D1%82%D0%BE%D0%B3%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82-%22%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B9-%D1%81%D0%B5%D0%BC%D0%B8%D0%BD%D0%B0%D1%80%22?node-id=2-2&t=sYjzDJjRgB7ZUjZ3-1).

## Задания и критерии

#### `store/app/components`

- доработать компонент `Cta` (1 балл)

- доработать компонент `BrowseByCategory` (1 балл за стилизацию мобильной версии и адаптив под десктоп, 1 балл за слайдер)

#### `packages/ui`

- доработать компонент `CategoryCard` (1 балл)
- написать стори для компонента `CategoryCard` (1 балл)

- найти и добавить иконку для скидок (`discounts`), внести ее в `Icon` и её стори, а также в перечисление внутри `CategoryCard` (1 балл)

- найти и добавить иконки для недостающих соцсетей, внести их в `Icon` и её стори, а также в компонент `Footer` (1 балл)

- доработать компонент `Footer`: доработать стилизацию (1 балл), сделать адаптив под десктоп (2 балла), добавить в `links` и `socialLinks` недостающие ссылки (1 балл)

## Установка и настройка

#### Настройка монорепозитория

1. Установите `pnpm`

```powershell
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
```

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

2. Отключите `corepack`

```powershell
corepack disable
```

3. Установите зависимости

```sh
pnpm i
```

4. Запустите докер-контейнеры

```sh
docker compose up
```

5. (при необходимости) Сгенерируйте ключ доступа 

```sh
docker compose exec backend ./generate_admin_key.sh
```

6. (при отсутствии) Создайте файл `apps/store/.env.local` и внесите в него ключ

#### Настройка @repo/crawler

1. Установите библиотеки

```powershell
cd packages\crawler

pnpm dlx camoufox fetch
```

2. Установите биндинги

```powershell
pnpm approve-builds // Выберите better-sqlite3
```