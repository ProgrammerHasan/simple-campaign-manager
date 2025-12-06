@component('mail::message')
    # Hello {{ $recipientName }},

    {!! $campaign->body !!}

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
