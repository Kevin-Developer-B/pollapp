import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  supabase = createClient('https://jhjioktzlzlmjvsbxeva.supabase.co', 'sb_publishable_NbL2wcqTG9MyJe-iAQgzLw_zfmvt9Ix')
}
