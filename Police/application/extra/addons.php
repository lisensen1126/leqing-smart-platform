<?php

return [
    'autoload' => false,
    'hooks' => [
        'app_init' => [
            'epay',
        ],
        'config_init' => [
            'summernote',
            'third',
        ],
        'view_filter' => [
            'vote',
        ],
        'user_sidenav_after' => [
            'vote',
        ],
    ],
    'route' => [
        '/example$' => 'example/index/index',
        '/example/d/[:name]' => 'example/demo/index',
        '/example/d1/[:name]' => 'example/demo/demo1',
        '/example/d2/[:name]' => 'example/demo/demo2',
        '/third$' => 'third/index/index',
        '/third/connect/[:platform]' => 'third/index/connect',
        '/third/callback/[:platform]' => 'third/index/callback',
        '/third/bind/[:platform]' => 'third/index/bind',
        '/third/unbind/[:platform]' => 'third/index/unbind',
        '/vote/$' => 'vote/index/index',
        '/vote/subject/[:diyname]' => 'vote/subject/index',
        '/vote/player/[:id]' => 'vote/player/index',
        '/vote/rank/[:diyname]' => 'vote/rank/index',
        '/vote/apply/[:diyname]' => 'vote/apply/index',
    ],
    'priority' => [],
    'domain' => '',
];
