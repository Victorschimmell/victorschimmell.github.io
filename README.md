# Running the application

## The database

Do:

```bash
docker pull postgres
docker run --name db -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

To run the studio, do:

```bash
npx prisma introspect # Probably not necessary
npx prisma studio
```

## The application

Do:

```bash
docker run -d -p 3000:3000 --name prod-container victorschimmell.github.io
```
