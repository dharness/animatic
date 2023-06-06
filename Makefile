.PHONY: supabase-start supabase-stop


supabase-up:
	@cd supabase/local; \
	supabase start; \
	cd ../test; \
	supabase start	

supabase-down:
	@echo "Stopping supabase..."; \
	cd supabase/local; \
	supabase stop; \
	cd ../test; \
	supabase stop
