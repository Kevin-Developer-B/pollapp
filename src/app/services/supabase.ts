import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})
export class Supabase {
 supabase = createClient('https://jhjioktzlzlmjvsbxeva.supabase.co/rest/v1/', 'sb_publishable_NbL2wcqTG9MyJe-iAQgzLw_zfmvt9Ix')
}
