create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_plan uuid;
begin
  insert into public.profiles(id, username, display_name, avatar_url)
  values (
    new.id,
    nullif(lower(new.raw_user_meta_data->>'username'), ''),
    left(
      coalesce(
        nullif(new.raw_user_meta_data->>'display_name', ''),
        nullif(new.raw_user_meta_data->>'full_name', ''),
        nullif(new.raw_user_meta_data->>'name', '')
      ),
      80
    ),
    coalesce(
      nullif(new.raw_user_meta_data->>'avatar_url', ''),
      nullif(new.raw_user_meta_data->>'picture', '')
    )
  );

  select id into v_plan
  from public.plans
  where slug = 'free' and active
  limit 1;

  insert into public.subscriptions(user_id, plan_id, status)
  values (new.id, v_plan, 'active');

  return new;
end
$$;
