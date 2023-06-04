.PHONY: supabase-start supabase-stop


supabase-start:
	@cd supabase/local; \
	supabase start; \
	cd ../test; \
	supabase start	

supabase-stop:
	@echo "Stopping supabase..."; \
	cd supabase/local; \
	supabase stop; \
	cd ../test; \
	supabase stop
