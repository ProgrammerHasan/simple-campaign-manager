<?php

namespace App\Observers;

use App\Jobs\SendCampaignEmailJob;
use App\Models\CampaignRecipient;

class CampaignRecipientObserver
{
    /**
     * Observer ব্যবহার করার সঠিক ও ভুল প্র্যাকটিস:
     *
     * 🔴 কখন Observer ব্যবহার করা উচিত নয়:
     *
     * 1. Hidden & Unexpected Behavior:
     *    -----------------------------------
     *    Observer model lifecycle এর সাথে লুকানো আচরণ যুক্ত করে।
     *    কেউ যদি CampaignRecipient::create([...]) দেখে,
     *    সে বুঝতেই পারবে না যে ব্যাকগ্রাউন্ডে ইমেইল পাঠানোর job dispatch হচ্ছে।
     *    এর ফলে কোড পড়া, বোঝা, এবং maintain করা কঠিন হয়ে যায়।
     *
     *    ▶ Example:
     *       CampaignRecipient::create([...]);
     *       // Developer ভাবে শুধু DB তে row তৈরি হলো,
     *       // কিন্তু আসলে ইমেইল পাঠানো শুরু হয়ে গেল।
     *
     * 2. Uncontrolled Triggers (Testing / Seeding / Import সমস্যা):
     *    ------------------------------------------------------------
     *    Observer সব create() তে কাজ করে—context বুঝে না।
     *    তাই:
     *      - Seeder চালালে ইমেইল পাঠাবে
     *      - Factory দিয়ে fake data তৈরি করলে ইমেইল পাঠাবে
     *      - CSV import এ bulk create হলে হাজারটা ইমেইল পাঠাবে
     *      - Test environment এ random job dispatch হবে
     *
     *    Production bug এর সবচেয়ে সাধারণ কারণ: observer ON থাকে কিন্তু developer খেয়াল করে না।
     *
     * 3. Business Logic Observer এ রাখা ভুল architecture:
     *    ------------------------------------------------
     *    Observer মূলত model level housekeeping এর জন্য:
     *      - slug generate করা
     *      - timestamps adjust করা
     *      - audit log তৈরি করা
     *      - field normalize
     *
     *    কিন্তু email পাঠানো, payment নেয়া, workflow শুরু—এগুলো Business Logic।
     *    → Service Layer বা Domain Layer এ থাকা উচিত।
     *
     * 4. No Context Awareness:
     *    -----------------------------------------------------
     *    Observer জানে না:
     *      - কে create কল করেছে (UI? import? test?)
     *      - কেন কল করেছে
     *      - কখন job পাঠানো উচিত, কখন নয়
     *      - rate limit দরকার কি না
     *      - batch dispatch লাগবে কি না
     *
     *    অর্থাৎ, observer workflow বা business constraint handle করতে পারে না।
     *
     * 5. Debug করা কঠিন:
     *    -----------------------------------
     *    Observer চালু আছে কিনা, কোন event-এ ট্রিগার হচ্ছে—
     *    অনেক developer জানেই না।
     *
     *    Production-এ সমস্যা:
     *      “ইমেইল কই থেকে dispatch হচ্ছে?” → খুঁজে পাওয়া কঠিন।
     *
     * 6. Violates Single Responsibility Principle (SRP):
     *    -----------------------------------------------
     *    Model lifecycle = ডেটা সংক্রান্ত বিষয়
     *    Business workflow = আলাদা responsibility
     *
     *    Observer এই দুই responsibility mix করে।
     *
     * 7. Accidental Side Effects:
     *    --------------------------------------------------
     *    Observer পরিবর্তন → হঠাৎ করে অ্যাপের অনেক অংশের behavior পরিবর্তন।
     *    কারণ সকল create() সেই observer follow করে।
     *
     *
     * ✅ কখন Observer ব্যবহার করা ঠিক:
     *
     * 1. Model housekeeping / automatic adjustments:
     *    - timestamps বা slug auto-generate করা
     *    - audit logging
     *    - data normalization
     *
     * 2. Lightweight automatic behaviors:
     *    - Cache clear করা
     *    - Related model touch করা
     *
     * 3. Non-critical background tasks, যেগুলো business logic নয় এবং context unaware হলেও নিরাপদ।
     *
     *
     * 🔥 Final Verdict:
     * - Observer event গুলো “surprise side effects” তৈরি করতে পারে।
     * - Business logic কখনোই observer-এ রাখা উচিত নয়।
     * - Observer ব্যবহার করা উচিত শুধু housekeeping / non-critical behaviors এর জন্য।
     */
    public function created(CampaignRecipient $recipient): void
    {
//        SendCampaignEmailJob::dispatch(
//            recipient: $recipient,
//        );
    }
}
