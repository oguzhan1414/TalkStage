-- RAG retrieval: cosine-similarity search over scenario_knowledge, callable via
-- PostgREST RPC since postgrest itself has no vector distance operator support.
create or replace function public.match_scenario_knowledge(
  query_embedding vector (1536),
  match_scenario_id uuid default null,
  match_count int default 6
)
returns table (
  id uuid,
  scenario_id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql
stable
as $$
  select
    sk.id,
    sk.scenario_id,
    sk.content,
    sk.metadata,
    1 - (sk.embedding <=> query_embedding) as similarity
  from public.scenario_knowledge sk
  where
    match_scenario_id is null
    or sk.scenario_id = match_scenario_id
    or sk.scenario_id is null -- global chunks (e.g. general Turkish-speaker error patterns)
  order by sk.embedding <=> query_embedding
  limit match_count;
$$;

grant execute on function public.match_scenario_knowledge (vector, uuid, int) to authenticated, anon;
