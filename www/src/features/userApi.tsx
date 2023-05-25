import { createClient } from '@supabase/supabase-js'
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

async function loadUser() {
    return supabase.auth.getSession();
}

async function signUpUser(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
}

async function logInUser(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
}

export default { loadUser, signUpUser, logInUser };