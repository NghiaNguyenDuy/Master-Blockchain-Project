dotnet ef migrations add VotingDbMigrate01 -p src/Voting.Infrastructure --startup-project src/Voting.Web -c VotingDbContext --output-dir Migrations

dotnet ef database update -p src/Voting.Infrastructure --startup-project src/Voting.Web -c VotingDbContext

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'uit_blockchain_voting';

DROP DATABASE uit_blockchain_voting;

CREATE DATABASE uit_blockchain_voting;
```