# TODO: Fix Frontend-Backend Connection Issues

## Step 1: Fix API key security and loading in external_routes.py
- Remove hardcoded API keys
- Use proper env var names (OPENAI_API_KEY, OPENWEATHER_API_KEY, etc.)
- Add proper error handling for missing keys

## Step 2: Add missing external routes
- Change /carbon-intensity to /carbon as POST route for carbon calculations
- Add /epa-data route with mock data

## Step 3: Fix data model mismatch
- Rename Planner model to Task with fields: id, task (string), completed (boolean), user_id
- Update schema, routes, and imports accordingly
- Change progress to completed in backend

## Step 4: Fix NudgeCard props
- Update to accept { title, description, category }
- Use category for impact color mapping
- Display description in the card

## Step 5: Update dependent files
- Rename models/planner.py to models/task.py
- Rename schemas/planner_schema.py to schemas/task_schema.py
- Rename routes/planner_routes.py to routes/task_routes.py
- Update main.py imports and registrations
- Update frontend API calls and components

## Step 6: Test connections
- Restart backend and frontend
- Verify API calls work without errors
- Check data flow between frontend and backend
