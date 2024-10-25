// oauth2-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Oauth2AuthGuard extends AuthGuard('oauth2') {}
