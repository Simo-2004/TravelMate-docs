# 1. Getting Started

This chapter covers installing TravelMate, opening it for the first time, and getting into the app.

## Installing the app

TravelMate is distributed as an Android package. Download it from the [releases page](https://github.com/Simo-2004/TravelMate/releases) and open the downloaded file to install it.

Android asks for permission before installing an app that did not come from the store. Allow it once, and the installation goes ahead.

The app needs no internet connection, either to install or to use.

## The first screen

TravelMate opens at the sign-in screen. It does this every time it starts, not only the first time, so anyone picking up the phone finds the app locked.

The screen holds two fields, an **Enter** button, and a link for making a new account.

<div class="phone-shots">
  <figure>
    <img src="/static/manual/chapter1-image1.jpg" alt="The sign-in screen" />
    <figcaption>The sign-in screen, shown each time the app opens</figcaption>
  </figure>
</div>

## Signing in

The app comes with one account already set up, so it can be opened straight away without filling in a form first.

| Field | Value |
|-------|-------|
| Username | `alessia` |
| Password | `travelmate` |

Type both and tap **Enter**.

Capital letters in the username do not matter, and spaces before or after it are ignored. The password is taken exactly as typed, so capital letters do matter there.

If either value is wrong, a message reading **Invalid username or password** appears at the bottom of the screen and the app stays where it is. What you typed is left in place, so only the wrong part needs correcting.

<div class="phone-shots">
  <figure>
    <img src="/static/manual/chapter1-image3.jpg" alt="A failed sign-in attempt" />
    <figcaption>A sign-in that was refused. The message does not say which of the two was wrong</figcaption>
  </figure>
</div>

The same message appears whichever of the two was wrong. This is deliberate: it means the message never tells someone guessing that they found a valid username.

## Creating your own account

To use your own name and details, tap **Create a new account** below the Enter button.

<div class="phone-shots">
  <figure>
    <img src="/static/manual/chapter1-image2.jpg" alt="The account creation form" />
    <figcaption>The account creation form. It continues below the visible part with the username and password fields</figcaption>
  </figure>
</div>

The form is longer than the screen, so scroll down to reach every field. Nothing is saved while you fill it in: leaving before you finish keeps the account you had.

| Field | Must contain |
|-------|-------------|
| **Name** | Required, up to 40 characters |
| **Surname** | Required, up to 40 characters |
| **Description** | Optional, up to 300 characters |
| **Username** | Required, 3 to 20 characters. Letters, digits, full stops and underscores only |
| **Password** | Required, 8 to 64 characters |

Tap **Create account** at the bottom when the form is complete. If an entry is not accepted, the reason appears under the field concerned and everything else you typed stays where it is.

### Adding a photo

Under **Profile photo**, tap **Upload photo** to choose a picture from the phone. The picture is copied into the app, so deleting the original from the gallery later does not remove it from your profile.

If you close the gallery without choosing, nothing changes. If the picture cannot be read, the app says so and the form stays as it was.

A photo is optional and can be added later from your profile.

### Adding tags

**Interest tags** describe what you enjoy. **Trip tags** describe the kinds of journey you prefer. Both are used to match you with companions and trips.

Type a tag in the field and tap **Add personal tag** below it. Added tags appear under the button; until then the form reads *No interest tags yet* or *No trip tags yet*.

The same tag is not added twice, and capital letters do not make two tags different — adding one that is already in the list does nothing. Tags are optional and can be changed later.

## After the account is created

The app opens straight onto the Home tab. There is no need to sign in again, and the sign-in screen cannot be reached with the back gesture.

Your new username and password replace the ones you signed in with. **The app holds one account at a time**, so making an account replaces the previous one. Saved items and conversations are not affected.

## What is kept on the phone

Everything TravelMate holds stays on the device. Nothing is sent anywhere, and there is no account on a server to reach from another phone.

| Kept | How |
|------|-----|
| Your account and profile | On the phone, in protected form |
| Your saved trips and companions | On the phone |
| Your conversations | On the phone, with the message text protected |

Protected means that someone who copies the app's files off the phone cannot read your profile, your username or your conversations. Your password is kept in a form that cannot be turned back into the password, not even by the app.

Two things follow from this:

- Removing the app removes its data with it, and the data cannot be recovered.
- A forgotten password cannot be recovered or reset. The only way back in is to reinstall the app, which starts again from the account described under [Signing in](#signing-in).
