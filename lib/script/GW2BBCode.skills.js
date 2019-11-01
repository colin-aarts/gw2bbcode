
/*

GW2BBCode.skills.js
===================

Copyright:		Colin Aarts, 2011–2012 <http://colinaarts.com>
License:		MIT <http://www.opensource.org/licenses/MIT>
Web/support:	<http://gw2bbcode.com>
*/

(function() {
  'use strict';
  GW2BBCode || (GW2BBCode = {});

  GW2BBCode.skillDataVersion = '0.1';

  GW2BBCode.skillData = {
    'help me!': {
      name: 'Help Me!',
      description: 'Call your allies for help. Restores some health.',
      slot: ['Downed', 'Drowning'],
      type: 'Shout',
      profession: 'All',
      recharge: 20
    },
    'strike': {
      name: 'Strike',
      description: 'Strike at your foe.',
      slot: 'Greatsword',
      profession: 'Guardian',
      recharge: 0,
      sequence: ['strike', 'vengeful strike', 'wrathful strike']
    },
    'vengeful strike': {
      name: 'Vengeful Strike',
      description: 'Strike your foe again.',
      slot: 'Greatsword',
      profession: 'Guardian',
      recharge: 0,
      sequence: ['strike', 'vengeful strike', 'wrathful strike']
    },
    'wrathful strike': {
      name: 'Wrathful Strike',
      description: 'Attack your foe with a wrathful strike.',
      slot: 'Greatsword',
      profession: 'Guardian',
      recharge: 0,
      sequence: ['strike', 'vengeful strike', 'wrathful strike']
    },
    'whirling wrath': {
      name: 'Whirling Wrath',
      description: 'Thrash foes around you in a spinning frenzy while flinging projectiles.',
      slot: 'Greatsword',
      profession: 'Guardian',
      recharge: 10
    },
    'symbol of swiftness': {
      name: 'Symbol of Swiftness',
      description: 'Pierce the ground with a mystic <span class="skill-type symbol">symbol</span> that damages foes and makes allies <span class="boon swiftness">swift</span>.',
      slot: 'Greatsword',
      profession: 'Guardian',
      type: 'Symbol',
      recharge: 15
    },
    'faithful strike': {
      name: 'Faithful Strike',
      description: '<span class="positioning leap">Leap</span> at your foe. If you hit, <span class="boon regeneration">regenerate</span> nearby allies.',
      slot: 'Greatsword',
      profession: 'Guardian',
      recharge: 30
    },
    'binding blade': {
      name: 'Binding Blade',
      description: 'Throw a blade at your foe, binding the two of you. If your foe gets too far away, they are pulled back and your bond breaks.',
      slot: 'Greatsword',
      profession: 'Guardian',
      recharge: 30
    },
    'hammer swing': {
      name: 'Hammer Swing',
      description: 'Strike your foe with a swing.',
      slot: 'Hammer',
      profession: 'Guardian',
      recharge: 0
    },
    'mighty blow': {
      name: 'Mighty Blow',
      description: 'Damages nearby foes with a mighty slam to the ground.',
      slot: 'Hammer',
      profession: 'Guardian',
      recharge: 8
    },
    'purge conditions': {
      name: 'Purge Conditions',
      description: 'Purges up to 5 conditions from nearby allies and set foes <span class="condition burning">on fire</span>.',
      slot: 'Hammer',
      profession: 'Guardian',
      recharge: 18
    },
    'banish': {
      name: 'Banish',
      description: '<span class="misc-effect launch">Launch</span> your foe with a banishing smash.',
      slot: 'Hammer',
      profession: 'Guardian',
      recharge: 35
    },
    'ring of warding': {
      name: 'Ring of Warding',
      description: 'Create a ring around you that foes cannot cross.',
      slot: 'Hammer',
      profession: 'Guardian',
      recharge: 45
    },
    'wave of wrath': {
      name: 'Wave of Wrath',
      description: 'Pummel the foes in front of you with a shockwave.',
      slot: 'Staff',
      profession: 'Guardian',
      recharge: '?'
    },
    'orb of light': {
      name: 'Orb of Light',
      description: 'Release a slow-moving, detonatable orb of light.',
      slot: 'Staff',
      profession: 'Guardian',
      recharge: 3,
      sequence: ['orb of light', 'flash of light']
    },
    'flash of light': {
      name: 'Flash of Light',
      description: 'Detonate <span class="skill">Orb of Light</span>.',
      slot: 'Staff',
      profession: 'Guardian',
      recharge: '?',
      sequence: ['orb of light', 'flash of light']
    },
    'symbol of protection': {
      name: 'Symbol of Protection',
      description: 'Sear a mystic <span class="skill-type symbol">symbol</span> into target area, damaging foes and <span class="boon protection">protecting</span> allies.',
      slot: 'Staff',
      profession: 'Guardian',
      type: 'Symbol',
      recharge: 15
    },
    'line of warding': {
      name: 'Line of Warding',
      description: 'Draw a line in front of you that foes cannot cross.',
      slot: 'Staff',
      profession: 'Guardian',
      type: 'Ward',
      recharge: 45
    },
    'martyr': {
      name: 'Martyr',
      description: 'Draw conditions from nearby allies to yourself. Gain <span class="boon fury">fury</span>, <span class="boon might">might</span>, <span class="boon protection">protection</span>, <span class="boon regeneration">regeneration</span>, <span class="boon swiftness">swiftness</span>, and <span class="boon vigor">vigor</span>.',
      slot: 'Staff',
      profession: 'Guardian',
      recharge: 50
    },
    'true strike': {
      name: 'True Strike',
      description: 'Smash your foe.',
      slot: 'Main-hand mace',
      profession: 'Guardian',
      recharge: '?',
      sequence: ['true strike', '?', '?']
    },
    'symbol of faith': {
      name: 'Symbol of Faith',
      description: 'Smash a mystic <span class="skill-type symbol">symbol</span> onto the ground that damages foes and <span class="boon regeneration">regenerates</span> allies.',
      slot: 'Main-hand mace',
      profession: 'Guardian',
      type: 'Symbol',
      recharge: 15
    },
    'protector\'s strike': {
      name: 'Protector\'s Strike',
      description: 'Grant <span class="boon protection">protection</span> to yourself and allies with a shield that strikes back at attackers.',
      slot: 'Main-hand mace',
      profession: 'Guardian',
      recharge: 15
    },
    'orb of wrath': {
      name: 'Orb of Wrath',
      description: 'Fire a slow-moving orb. If traited, it <span class="condition burning">burns</span> foes on a critical hit.',
      slot: 'Scepter',
      profession: 'Guardian',
      recharge: '?'
    },
    'smite': {
      name: 'Smite',
      description: 'Strike foes in target area repeatedly.',
      slot: 'Scepter',
      profession: 'Guardian',
      recharge: 6
    },
    'chains of light': {
      name: 'Chains of Light',
      description: '<span class="condition immobilized">Immobilize</span> your foe in ethereal chains.',
      slot: 'Scepter',
      profession: 'Guardian',
      recharge: 18
    },
    'sword of wrath': {
      name: 'Sword of Wrath',
      description: 'Slash your foe and strike again on the backswing.',
      slot: 'Main-hand sword',
      profession: 'Guardian',
      recharge: '?'
    },
    'flashing blade': {
      name: 'Flashing Blade',
      description: '<span class="positioning teleport">Flash</span> to target location, <span class="condition blind">Blinding</span> foes along your path.',
      slot: 'Main-hand sword',
      profession: 'Guardian',
      recharge: 15
    },
    'zealot\'s defense': {
      name: 'Zealot\'s Defense',
      description: '<span class="technique block">Block</span> enemy ranged attacks while sending out magical projectiles.',
      slot: 'Main-hand sword',
      profession: 'Guardian',
      recharge: 15
    },
    'ray of judgment': {
      name: 'Ray of Judgment',
      description: 'Damage and <span class="condition blind">Blind</span> up to three nearby enemies. Heal and remove a condition from nearby allies.',
      slot: 'Focus',
      profession: 'Guardian',
      recharge: 30
    },
    'shield of wrath': {
      name: 'Shield of Wrath',
      description: 'Create a shield and ward off the next few attacks. If not destroyed, the shield will soon explode, damaging nearby foes.',
      slot: 'Focus',
      profession: 'Guardian',
      recharge: 60
    },
    'shield of judgment': {
      name: 'Shield of Judgment',
      description: 'Pass a judging shield wave in front of you, damaging foes while <span class="boon protection">protecting</span> yourself and allies.',
      slot: 'Shield',
      profession: 'Guardian',
      recharge: 15
    },
    'shield of absorption': {
      name: 'Shield of Absorption',
      description: 'Create a dome around you that knocks back foes and then absorbs projectiles.',
      slot: 'Shield',
      profession: 'Guardian',
      recharge: 20
    },
    'cleansing flame': {
      name: 'Cleansing Flame',
      description: 'Throw a cone of celestial fire in front of you, scorching foes while removing conditions from allies.',
      slot: 'Torch',
      profession: 'Guardian',
      recharge: 20
    },
    'zealot\'s flame': {
      name: 'Zealot\'s Flame',
      description: 'Set yourself alight, periodically <span class="condition burning">burning</span> up to three nearby foes.',
      slot: 'Torch',
      profession: 'Guardian',
      recharge: 20,
      sequence: ['zealot\'s flame', 'zealot\'s fire']
    },
    'zealot\'s fire': {
      name: 'Zealot\'s Fire',
      description: '<span class="condition burning">Ignite</span> your foe with a fireball. Puts your <span class="skill">Zealot\'s Flame</span> into a 40 second recharge.',
      slot: 'Torch',
      profession: 'Guardian',
      recharge: '?',
      sequence: ['zealot\'s flame', 'zealot\'s fire']
    },
    'spear of light': {
      name: 'Spear of Light',
      description: 'Throw a spear that makes your foe <span class="condition vulnerability">vulnerable</span>.',
      slot: 'Spear',
      profession: 'Guardian',
      recharge: '?'
    },
    'zealot\'s flurry': {
      name: 'Zealot\'s Flurry',
      description: 'Strike foes in front of you with a storm of jabs.',
      slot: 'Spear',
      profession: 'Guardian',
      recharge: 6
    },
    'brilliance': {
      name: 'Brilliance',
      description: 'Hit all foes around you with <span class="condition blind">blindness</span>.',
      slot: 'Spear',
      profession: 'Guardian',
      recharge: 16
    },
    'spear wall': {
      name: 'Spear Wall',
      description: 'Create a spear wall that <span class="condition bleeding">bleeds</span> foes passing through it.',
      slot: 'Spear',
      profession: 'Guardian',
      recharge: 20
    },
    'wrathful grasp': {
      name: 'Wrathful Grasp',
      description: 'Throw a spear and <span class="positioning pull">pull</span> your foe to you, making them <span class="condition burning">burn</span>.',
      slot: 'Spear',
      profession: 'Guardian',
      recharge: 25
    },
    'light of judgment': {
      name: 'Light of Judgment',
      description: 'Launch a ball of light that heals allies and damages foes.',
      slot: 'Trident',
      profession: 'Guardian',
      recharge: '?'
    },
    'weight of justice': {
      name: 'Weight of Justice',
      description: '<span class="positioning sink">Sink</span> your foe with the weight of justice.',
      slot: 'Trident',
      profession: 'Guardian',
      recharge: 20
    },
    'purify': {
      name: 'Purify',
      description: 'Remove all conditions from nearby allies and <span class="condition burning">burn</span> nearby foes.',
      slot: 'Trident',
      profession: 'Guardian',
      recharge: '?'
    },
    'pillar of light': {
      name: 'Pillar of Light',
      description: 'Create a pillar of light at foe\'s location. Pulses damage every second.',
      slot: 'Trident',
      profession: 'Guardian',
      recharge: '?'
    },
    'wall of refraction': {
      name: 'Wall of Refraction',
      description: 'Create a wall that turns hostile projectiles into healing energy.',
      slot: 'Trident',
      profession: 'Guardian',
      recharge: 45
    },
    'healing breeze': {
      name: 'Healing Breeze',
      description: 'Heal yourself and allies with a healing breeze.',
      slot: 'Healing',
      profession: 'Guardian',
      recharge: 30
    },
    'shelter': {
      name: 'Shelter',
      description: '<span class="technique block">Block</span> attacks while healing.',
      slot: 'Healing',
      profession: 'Guardian',
      recharge: 45
    },
    'signet of resolve': {
      name: 'Signet of Resolve',
      description: '<span class="signature-label">Passive:</span> Lose a condition every 10 seconds. <span class="signature-label">Active:</span> Heal yourself.',
      slot: 'Healing',
      type: 'Signet',
      profession: 'Guardian',
      recharge: 30
    },
    'contemplation of purity': {
      name: 'Contemplation of Purity',
      description: 'Remove all conditions, turning them into boons.',
      slot: 'Utility',
      profession: 'Guardian',
      recharge: 30
    },
    'judge\'s intervention': {
      name: 'Judge\'s Intervention',
      description: '<span class="positioning teleport">Teleport</span> to your target, grant <span class="boon vigor">vigor</span> to nearby allies, and <span class="condition burning">burn</span> nearby foes.',
      slot: 'Utility',
      profession: 'Guardian',
      recharge: 45
    },
    'meditate': {
      name: 'Meditate',
      description: 'Recharge all <span class="skill-type virtue">virtues</span> instantly.',
      slot: 'Utility',
      profession: 'Guardian',
      recharge: 90
    },
    'smite conditions': {
      name: 'Smite Conditions',
      description: 'Remove all conditions. Damage nearby foes, doubling damage if a condition is removed. Can be used while <span class="misc-effect stun">stunned</span>.',
      slot: 'Utility',
      profession: 'Guardian',
      recharge: 30
    },
    'wall of deflection': {
      name: 'Wall of Deflection',
      description: 'Protect target area with a wall of mystic power that <span class="technique block">deflects</span> projectiles.',
      slot: 'Utility',
      profession: 'Guardian',
      recharge: 30
    },
    '"hold the line"': {
      name: '"Hold the Line"',
      description: 'Grant <span class="boon protection">protection</span> and <span class="boon regeneration">regeneration</span> to allies.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Guardian',
      recharge: 80
    },
    '"retreat"': {
      name: '"Retreat"',
      description: 'Grants <span class="boon protection">protection</span> and <span class="boon swiftness">swiftness</span> to nearby allies.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Guardian',
      recharge: 80
    },
    'save yourselves': {
      name: 'Save Yourselves',
      description: 'All allies gain <span class="boon swiftness">swiftness</span> and <span class="boon vigor">vigor</span>.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Guardian',
      recharge: 45
    },
    '"stand your ground"': {
      name: '"Stand Your Ground"',
      description: 'Grants <span class="boon protection">protection</span> and <span class="boon regeneration">regeneration</span> to allies.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Guardian',
      recharge: 30
    },
    'bane signet': {
      name: 'Bane Signet',
      description: '<span class="signature-label">Passive:</span> You gain <span class="boon might">might</span>. <span class="signature-label">Active:</span> Knock down and damage your foe.',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Guardian',
      recharge: 60
    },
    'signet of judgment': {
      name: 'Signet of Judgment',
      description: '<span class="signature-label">Passive:</span> Grants you <span class="boon protection">protection</span>. <span class="signature-label">Active:</span> All nearby foes are <span class="condition burning">burned</span> and all nearby allies gain <span class="boon regeneration">regeneration</span>.',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Guardian',
      recharge: 60
    },
    'signet of wrath': {
      name: 'Signet of Wrath',
      description: '<span class="signature-label">Passive:</span> Nearby foes suffer from <span class="condition burning">burning</span>. <span class="signature-label>Active:</span> <span class="condition burning">Burn</span> and <span class="condition blind">blind</span> your target foe.',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Guardian',
      recharge: 90
    },
    'hammer of wisdom': {
      name: 'Hammer of Wisdom',
      description: 'Summon an arcane hammer to defend you.',
      slot: 'Utility',
      type: 'Spirit weapon',
      profession: 'Guardian',
      recharge: 45,
      sequence: ['hammer of wisdom', 'command']
    },
    'command': {
      name: 'Command',
      description: 'Command your <span class="skill">Hammer of Wisdom</span> to <span class="misc-effect knockdown">knock down</span> targeted foe.',
      slot: 'Utility',
      profession: 'Guardian',
      recharge: '?',
      sequence: ['hammer of wisdom', 'command']
    },
    'symbol of courage': {
      name: 'Symbol of Courage',
      description: 'Sear a mystic <span class="skill-type symbol">symbol</span> into the ground that damages foes and grants <span class="boon might">might</span> to allies.',
      slot: 'Utility',
      type: 'Symbol',
      profession: 'Guardian',
      recharge: 20
    },
    'sanctuary': {
      name: 'Sanctuary',
      description: 'Form a protective shelter that keeps out foes and hostile projectiles.',
      slot: 'Elite',
      type: 'Ward',
      profession: 'Guardian',
      recharge: 180
    },
    'wrath': {
      name: 'Wrath',
      description: 'Focus a wrathful light ray on your foe.',
      slot: 'Downed',
      profession: 'Guardian',
      recharge: '?'
    },
    'purifying light': {
      name: 'Purifying Light',
      description: '<span class="condition blind">Blind</span> foes and remove a condition from allies.',
      slot: 'Downed',
      profession: 'Guardian',
      recharge: 20
    },
    'symbol of judgment': {
      name: 'Symbol of Judgment',
      description: 'Draw a <span class="skill-type symbol">symbol</span> on the ground that heals allies and <span class="condition burning">burns</span> foes.',
      slot: 'Downed',
      profession: 'Guardian',
      recharge: 10
    },
    'shackle': {
      name: 'Shackle',
      description: 'Shackle your foe to <span class="condition crippled">cripple</span> them.',
      slot: 'Drowning',
      profession: 'Guardian',
      recharge: '?'
    },
    'reveal the depths': {
      name: 'Reveal the Depths',
      description: 'Damage foes in an area that grows larger.',
      slot: 'Drowning',
      profession: 'Guardian',
      recharge: 1
    },
    'renewing current': {
      name: 'Renewing Current',
      description: 'Escape up towards the surface.',
      slot: 'Drowning',
      profession: 'Guardian',
      recharge: 15
    },
    'virtue of justice': {
      name: 'Virtue of Justice',
      description: '<span class="signature-label">Passive:</span> <span class="condition burning">Burn</span> foes with your every fifth attack. <span class="signature-label">Active:</span> Nearby allies set foes <span class="condition burning">on fire</span> with their next attacks.',
      slot: 'Profession mechanic',
      type: 'Virtue',
      profession: 'Guardian',
      recharge: 20
    },
    'virtue of courage': {
      name: 'Virtue of Courage',
      description: '<span class="signature-label">Passive:</span> Every 30 seconds you gain an <span class="boon aegis">aegis</span> that <span class="technique block">blocks</span> the next attack. <span class="signature-label">Active:</span> Grant <span class="boon aegis">aegis</span> to nearby allies.',
      slot: 'Profession mechanic',
      type: 'Virtue',
      profession: 'Guardian',
      recharge: 60
    },
    'virtue of resolve': {
      name: 'Virtue of Resolve',
      description: '<span class="signature-label">Passive:</span> <span class="boon regeneration">Regenerate</span> health. <span class="signature-label">Active:</span> Remove conditions and <span class="boon regeneration">regenerate</span> nearby allies.',
      slot: 'Profession mechanic',
      type: 'Virtue',
      profession: 'Guardian',
      recharge: 40
    },
    'face me': {
      name: 'Face Me',
      description: 'Shout at your foes, <span class="condition crippled">crippling</span> them. Increased adrenaline gives you <span class="boon swiftness">swiftness</span> (stage 2) and <span class="condition immobilized">immobilizes</span> foes (stage 3).',
      slot: 'Greatsword',
      type: 'Shout',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 10
    },
    'greatsword swing': {
      name: 'Greatsword Swing',
      description: 'Slash your foe.',
      slot: 'Greatsword',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['greatsword swing', 'greatsword slice', 'brutal strike']
    },
    'greatsword slice': {
      name: 'Greatsword Slice',
      description: 'Strike your foe again.',
      slot: 'Greatsword',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['greatsword swing', 'greatsword slice', 'brutal strike']
    },
    'brutal strike': {
      name: 'Brutal Strike',
      description: 'Strike your foe to inflict <span class="condition vulnerability">vulnerability</span>.',
      slot: 'Greatsword',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['greatsword swing', 'greatsword slice', 'brutal strike']
    },
    'hundred blades': {
      name: 'Hundred Blades',
      description: 'Repeatedly strike multiple foes.',
      slot: 'Greatsword',
      profession: 'Warrior',
      recharge: 6
    },
    'whirlwind attack': {
      name: 'Whirlwind Attack',
      description: 'Advance forward, slashing the foes in your way.',
      slot: 'Greatsword',
      profession: 'Warrior',
      recharge: 12
    },
    'bladetrail': {
      name: 'Bladetrail',
      description: 'Throw your greatsword at target area and back, hitting foes each way.',
      slot: 'Greatsword',
      profession: 'Warrior',
      recharge: 20
    },
    'uppercut': {
      name: 'Uppercut',
      description: '<span class="misc-effect launch">Launch</span> your foe over your head with an uppercut.',
      slot: 'Greatsword',
      profession: 'Warrior',
      recharge: 30
    },
    'earthshaker': {
      name: 'Earthshaker',
      description: '<span class="positioning leap">Jump</span> to target point, and slam your hammer down, damaging and <span class="misc-effect stun">stunning</span> foes.',
      slot: 'Hammer',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 10
    },
    'fierce blow': {
      name: 'Fierce Blow',
      description: '<span class="condition weakness">Weaken</span> your foe with a fierce blow.',
      slot: 'Hammer',
      profession: 'Warrior',
      recharge: 10
    },
    'hammer shock': {
      name: 'Hammer Shock',
      description: 'Smash the ground and send out a <span class="condition crippled">crippling</span> wave.',
      slot: 'Hammer',
      profession: 'Warrior',
      recharge: 15
    },
    'staggering blow': {
      name: 'Staggering Blow',
      description: '<span class="misc-effect knockback">Knock back</span> nearby foes with a staggering blow.',
      slot: 'Hammer',
      profession: 'Warrior',
      recharge: 20
    },
    'backbreaker': {
      name: 'Backbreaker',
      description: '<span class="misc-effect knockdown">Knock down</span> your foe with a backbreaking smash. (Knockdown: 2 seconds)',
      slot: 'Hammer',
      profession: 'Warrior',
      recharge: 20
    },
    'combustive shot': {
      name: 'Combustive Shot',
      description: 'Ignite target area, setting the foes there <span class="condition burning">on fire</span>.',
      slot: 'Longbow',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 20
    },
    'dual shot': {
      name: 'Dual Shot',
      description: 'Shoot a pair of arrows at your foe.',
      slot: 'Longbow',
      profession: 'Warrior',
      recharge: '?'
    },
    'incendiary shot': {
      name: 'Incendiary Shot',
      description: 'Fire an arrow that explodes on impact, <span class="condition burning">burning</span> your foe and damaging those in the blast area.',
      slot: 'Longbow',
      profession: 'Warrior',
      recharge: 10
    },
    'fan of fire': {
      name: 'Fan of Fire',
      description: 'Fire 3 <span class="condition burning">burning</span> arrows in a spread pattern.',
      slot: 'Longbow',
      profession: 'Warrior',
      recharge: 10
    },
    'pin down': {
      name: 'Pin Down',
      description: 'Fire an arrow that <span class="condition immobilized">immobilizes</span> target foe.',
      slot: 'Longbow',
      profession: 'Warrior',
      recharge: 15
    },
    'arcing arrow': {
      name: 'Arcing Arrow',
      description: 'Shoot a slow, arcing arrow that explodes on impact.',
      slot: 'Longbow',
      profession: 'Warrior',
      recharge: 15
    },
    'kill shot': {
      name: 'Kill Shot',
      description: 'Fire a powerful shot. Damage increases with adrenaline level.',
      slot: 'Rifle',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 10
    },
    'bleeding shot': {
      name: 'Bleeding Shot',
      description: 'Shoot into your foe and watch them <span class="condition bleeding">bleed</span>.',
      slot: 'Rifle',
      profession: 'Warrior',
      recharge: 0
    },
    'aimed shot': {
      name: 'Aimed Shot',
      description: 'Fire a precise shot that <span class="condition crippled">cripples</span> your foe.',
      slot: 'Rifle',
      profession: 'Warrior',
      recharge: 10
    },
    'volley': {
      name: 'Volley',
      description: 'Fire a volley of shots at your foe.',
      slot: 'Rifle',
      profession: 'Warrior',
      recharge: 10
    },
    'brutal shot (rifle)': {
      name: 'Brutal Shot (rifle)',
      description: 'Shoot your foe and make them <span class="condition vulnerability">vulnerable</span>.',
      slot: 'Rifle',
      tags: ['Charge skill'],
      profession: 'Warrior',
      recharge: 15
    },
    'rifle butt': {
      name: 'Rifle Butt',
      description: '<span class="misc-effect knockback">Knock back</span> your foe with your rifle butt.',
      slot: 'Rifle',
      profession: 'Warrior',
      recharge: 20
    },
    'eviscerate': {
      name: 'Eviscerate',
      description: 'Leap at your foe with an eviscerating attack. Effect increases with adrenaline level.',
      slot: 'Main-hand axe',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 10
    },
    'chop': {
      name: 'Chop',
      description: 'Chop at your foe.',
      slot: 'Main-hand axe',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['chop', 'double chop', 'triple chop']
    },
    'double chop': {
      name: 'Double Chop',
      description: 'Chop twice at your foe.',
      slot: 'Main-hand axe',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['chop', 'double chop', 'triple chop']
    },
    'triple chop': {
      name: 'Triple Chop',
      description: 'Chop three times at your foe.',
      slot: 'Main-hand axe',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['chop', 'double chop', 'triple chop']
    },
    'cyclone axe': {
      name: 'Cyclone Axe',
      description: 'Spin around and attack all nearby foes.',
      slot: 'Main-hand axe',
      profession: 'Warrior',
      recharge: 4
    },
    'throw axe': {
      name: 'Throw Axe',
      description: 'Throw an axe that causes <span class="condition vulnerability">vulnerability</span>. (Vulnerability: 5 seconds)',
      slot: 'Main-hand axe',
      profession: 'Warrior',
      recharge: 6
    },
    'dual strike': {
      name: 'Dual Strike',
      description: 'Strike your foe with both axes.',
      slot: 'Off-hand axe',
      profession: 'Warrior',
      recharge: 12
    },
    'whirling axe': {
      name: 'Whirling Axe',
      description: 'Spin and attack nearby foes. You can move while spinning.',
      slot: 'Off-hand axe',
      profession: 'Warrior',
      recharge: 20
    },
    'skull crack': {
      name: 'Skull Crack',
      description: '<span class="misc-effect stun">Stun</span> your foe with a skull crack. Effect increases with adrenaline level.',
      slot: 'Main-hand mace',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 10
    },
    'mace smash': {
      name: 'Mace Smash',
      description: 'Smash your foe.',
      slot: 'Main-hand mace',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['mace smash', 'mace bash', 'pulverize']
    },
    'mace bash': {
      name: 'Mace Bash',
      description: 'Bash your foe.',
      slot: 'Main-hand mace',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['mace smash', 'mace bash', 'pulverize']
    },
    'pulverize': {
      name: 'Pulverize',
      description: 'Pulverize your foe, leaving them <span class="condition weakness">weakened</span>.',
      slot: 'Main-hand mace',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['mace smash', 'mace bash', 'pulverize']
    },
    'counter blow': {
      name: 'Counter Blow',
      description: '<span class="technique block">Block</span> the next attack. Counter with an attack if you are in melee range. (<span class="misc-effect knockdown">Knockdown</span>: 2 seconds)',
      slot: 'Main-hand mace',
      profession: 'Warrior',
      recharge: 6
    },
    'pommel bash': {
      name: 'Pommel Bash',
      description: '<span class="misc-effect daze">Daze</span> your foe with a brutal pommel bash. (Daze: 1 second)',
      slot: 'Main-hand mace',
      profession: 'Warrior',
      recharge: 15
    },
    'crushing blow': {
      name: 'Crushing Blow',
      description: 'Crush your opponent\'s armor leaving them <span class="condition vulnerability">vulnerable</span>. (Vulnerability: 10 seconds)',
      slot: 'Off-hand mace',
      profession: 'Warrior',
      recharge: 20
    },
    'tremor': {
      name: 'Tremor',
      description: 'Hit the ground and send a <span class="condition crippled">crippling</span> wave towards your foe.',
      slot: 'Off-hand mace',
      profession: 'Warrior',
      recharge: 20
    },
    'flurry': {
      name: 'Flurry',
      description: '<span class="condition immobilized">Immobilize</span> your foes with a flurry of strikes. Effect increases with adrenaline level.',
      slot: 'Main-hand sword',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 5
    },
    'sever artery': {
      name: 'Sever Artery',
      description: '<span class="condition bleeding">Bleed</span> your foe with a slash.',
      slot: 'Main-hand sword',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['sever artery', 'gash', 'final thrust']
    },
    'gash': {
      name: 'Gash',
      description: '<span class="condition bleeding">Bleed</span> your foe with a gash.',
      slot: 'Main-hand sword',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['sever artery', 'gash', 'final thrust']
    },
    'final thrust': {
      name: 'Final Thrust',
      description: 'Strike your foe with a powerful thrust.',
      slot: 'Main-hand sword',
      profession: 'Warrior',
      recharge: '?',
      sequence: ['sever artery', 'gash', 'final thrust']
    },
    'savage leap': {
      name: 'Savage Leap',
      description: '<span class="positioning leap">Lunge</span> at your foe.',
      slot: 'Main-hand sword',
      profession: 'Warrior',
      recharge: 8
    },
    'hamstring': {
      name: 'Hamstring',
      description: '<span class="condition crippled">Cripple</span> your foe with a precise slash.',
      slot: 'Main-hand sword',
      profession: 'Warrior',
      recharge: 15
    },
    'impale (warrior)': {
      name: 'Impale (warrior)',
      description: 'Throw your sword at your foe. While it is in them it applies <span class="condition bleeding">bleeding</span>, but you cannot <span class="skill">riposte</span>.',
      slot: 'Off-hand sword',
      profession: 'Warrior',
      recharge: 20
    },
    'riposte': {
      name: 'Riposte',
      description: 'Hold to <span class="technique block">block</span> attacks. Riposte and <span class="condition bleeding">bleed</span> your foe if you block a melee attack.',
      slot: 'Off-hand sword',
      profession: 'Warrior',
      recharge: 15
    },
    'shield bash': {
      name: 'Shield Bash',
      description: 'Bash your foe with your shield and <span class="misc-effect stun">stun</span> them.',
      slot: 'Shield',
      profession: 'Warrior',
      recharge: 25
    },
    'shield stance': {
      name: 'Shield Stance',
      description: '<span class="technique block">Block</span> incoming attacks.',
      slot: 'Shield',
      profession: 'Warrior',
      recharge: 25
    },
    'charge': {
      name: 'Charge',
      description: 'Grant <span class="boon swiftness">swiftness</span> to yourself and allies. Also cure them of <span class="condition chilled">freezing</span>, <span class="condition crippled">crippling</span>, and <span class="condition immobilized">immobilization</span>.',
      slot: 'Warhorn',
      profession: 'Warrior',
      recharge: 10
    },
    'call to arms': {
      name: 'Call to Arms',
      description: 'Grant <span class="boon vigor">vigor</span> to yourself and allies for 30 seconds. Also <span class="condition weakness">weaken</span> nearby foes for 10 seconds.',
      slot: 'Warhorn',
      profession: 'Warrior',
      recharge: 20
    },
    'forceful shot': {
      name: 'Forceful Shot',
      description: 'Shoot at your foe doing more damage the more adrenaline you have.',
      slot: 'Harpoon gun',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 30
    },
    'brutal shot (harpoon gun)': {
      name: 'Brutal Shot (harpoon gun)',
      description: 'Make your foe <span class="condition vulnerability">vulnerable</span> with a shot to their vital spot.',
      slot: 'Harpoon gun',
      profession: 'Warrior',
      recharge: 0
    },
    'spread shot': {
      name: 'Spread Shot',
      description: 'Your shot splits into five spears.',
      slot: 'Harpoon gun',
      profession: 'Warrior',
      recharge: 5
    },
    'ripper': {
      name: 'Ripper',
      description: 'Thrust a harpoon that <span class="condition bleeding">bleeds</span> your foe.',
      slot: 'Harpoon gun',
      profession: 'Warrior',
      recharge: 12
    },
    'knot shot': {
      name: 'Knot Shot',
      description: 'Fire a shot that <span class="condition immobilized">immobilizes</span> your foe.',
      slot: 'Harpoon gun',
      profession: 'Warrior',
      recharge: 25
    },
    'repeating shot': {
      name: 'Repeating Shot',
      description: 'Fire multiple shots with <span class="misc-effect knockback">knock back</span> strength at your foe.',
      slot: 'Harpoon gun',
      profession: 'Warrior',
      recharge: 25
    },
    'tsunami rush': {
      name: 'Tsunami Rush',
      description: 'Spin forward and attack foes along the way. Effect increases with adrenaline level.',
      slot: 'Spear',
      tags: ['Burst skill'],
      profession: 'Warrior',
      recharge: 30
    },
    'stab (warrior)': {
      name: 'Stab (warrior)',
      description: 'Stab your foe.',
      slot: 'Spear',
      profession: 'Warrior',
      recharge: '?'
    },
    'mariner\'s frenzy': {
      name: 'Mariner\'s Frenzy',
      description: 'Attack foes in front of you with a series of strikes.',
      slot: 'Spear',
      profession: 'Warrior',
      recharge: 8
    },
    'parry': {
      name: 'Parry',
      description: '<span class="technique block">Block</span> and counterattack your foe with a powerful strike.',
      slot: 'Spear',
      profession: 'Warrior',
      recharge: 15
    },
    'harpoon pull': {
      name: 'Harpoon Pull',
      description: '<span class="positioning pull">Pull</span> your foe to you.',
      slot: 'Spear',
      profession: 'Warrior',
      recharge: 25
    },
    'whirling strike': {
      name: 'Whirling Strike',
      description: 'Hit all foes around you.',
      slot: 'Spear',
      profession: 'Warrior',
      recharge: 30
    },
    'aggressive refrain': {
      name: 'Aggressive Refrain',
      description: '(none)',
      slot: 'Healing',
      profession: 'Warrior',
      recharge: '?'
    },
    'healing surge': {
      name: 'Healing Surge',
      description: 'Heal yourself and build adrenaline.',
      slot: 'Healing',
      profession: 'Warrior',
      recharge: 30
    },
    'mending': {
      name: 'Mending',
      description: 'Heal yourself and remove a condition.',
      slot: 'Healing',
      profession: 'Warrior',
      recharge: 20
    },
    'healing signet': {
      name: 'Healing Signet',
      description: '<span class="signature-label">Passive:</span> Gain <span class="boon regeneration">regeneration</span>. <span class="signature-label">Active:</span> Heal yourself.',
      slot: 'Healing',
      type: 'Signet',
      profession: 'Warrior',
      recharge: 40
    },
    'bull\'s charge': {
      name: 'Bull\'s Charge',
      description: 'Charge your foe. <span class="misc-effect knockdown">Knock down</span> fleeing foes.',
      slot: 'Utility',
      profession: 'Warrior',
      recharge: 25
    },
    'endure pain': {
      name: 'Endure Pain',
      description: 'You take no damage from incoming attacks. (Duration: 5 seconds and breaks <span class="misc-effect stun">stun</span>)',
      slot: 'Utility',
      profession: 'Warrior',
      recharge: 90
    },
    'frenzy': {
      name: 'Frenzy',
      description: 'Move faster and gain a higher chance of critical attack. (Breaks <span class="misc-effect stun">stun</span>)',
      slot: 'Utility',
      profession: 'Warrior',
      recharge: 60
    },
    'kick (warrior)': {
      name: 'Kick (warrior)',
      description: '<span class="misc-effect knockback">Knock back</span> your foe with a kick. (Knockback distance: 20 feet)',
      slot: 'Utility',
      profession: 'Warrior',
      recharge: 20
    },
    'stomp': {
      name: 'Stomp',
      description: '<span class="misc-effect launch">Launch</span> nearby foes into the air with a powerful stomp.',
      slot: 'Utility',
      profession: 'Warrior',
      recharge: 60
    },
    'throw bolas': {
      name: 'Throw Bolas',
      description: 'Throw bolas to <span class="condition immobilized">immobilize</span> your foe.',
      slot: 'Utility',
      profession: 'Warrior',
      recharge: 20
    },
    'banner of courage': {
      name: 'Banner of Courage',
      description: 'Place a <span class="skill-type banner">banner</span> that enhances melee attacks.',
      slot: 'Utility',
      type: 'Banner',
      profession: 'Warrior',
      recharge: 60
    },
    'banner of wisdom': {
      name: 'Banner of Wisdom',
      description: 'It increases the power of magical attacks made by allies.',
      slot: 'Utility',
      type: 'Banner',
      profession: 'Warrior',
      recharge: '?'
    },
    'fear me': {
      name: 'Fear Me',
      description: '<span class="condition weakness">Weaken</span> and induce <span class="condition fear">fear</span> in all foes within earshot.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Warrior',
      recharge: 80
    },
    'for great justice': {
      name: 'For Great Justice',
      description: 'Grant <span class="condition fury">fury</span> and <span class="boon might">might</span> to yourself and nearby allies.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Warrior',
      recharge: 30
    },
    '"i will avenge you"': {
      name: '"I Will Avenge You"',
      description: 'If the warrior kills an enemy while this skill is active, then all nearby allies will rally.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Warrior',
      recharge: '?'
    },
    'on my mark': {
      name: 'On My Mark',
      description: 'Call out target foe to make them <span class="condition vulnerability">vulnerable</span> for 10 seconds.',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Warrior',
      recharge: 20
    },
    'shake it off': {
      name: 'Shake It Off',
      description: 'Remove a condition from yourself and nearby allies. Can also break <span class="misc-effect stun">stuns</span>. (Area of effect: 100 feet)',
      slot: 'Utility',
      type: 'Shout',
      profession: 'Warrior',
      recharge: 30
    },
    'signet of fury': {
      name: 'Signet of Fury',
      description: '<span class="signature-label">Passive:</span> You gain <span class="boon fury">fury</span>. <span class="signature-label">Active:</span> You gain adrenaline.',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Warrior',
      recharge: 90
    },
    'signet of might': {
      name: 'Signet of Might',
      description: '<span class="signature-label">Passive:</span> Gain <span class="boon might">power</span>. <span class="signature-label">Active:</span> Double damage with your next attack. (Active: +150% damage on next attack)',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Warrior',
      recharge: 80
    },
    'berserker stance': {
      name: 'Berserker Stance',
      description: 'Gain adrenaline for a short time.',
      slot: 'Utility',
      type: 'Stance',
      profession: 'Warrior',
      recharge: 80
    },
    'destruction': {
      name: 'Destruction',
      description: 'All of the warrior\'s attacks are area-of-effect.',
      slot: 'Elite',
      profession: 'Warrior',
      recharge: '?'
    },
    'rampage': {
      name: 'Rampage',
      description: 'Rampage.',
      slot: 'Elite',
      profession: 'Warrior',
      recharge: 180
    },
    'battle standard': {
      name: 'Battle Standard',
      description: 'Place a battle standard that buffs and revives fallen allies.',
      slot: 'Elite',
      type: 'Banner',
      profession: 'Warrior',
      recharge: 180
    },
    'throw rock': {
      name: 'Throw Rock',
      description: 'Hold and release to throw a rock. Hold longer for more damage.',
      slot: 'Downed',
      tags: ['Charge skill'],
      profession: 'Warrior',
      recharge: '?'
    },
    'hammer toss': {
      name: 'Hammer Toss',
      description: 'Throw a hammer that <span class="misc-effect knockback">knocks down</span> foes.',
      slot: 'Downed',
      profession: 'Warrior',
      recharge: 10
    },
    'vengeance': {
      name: 'Vengeance',
      description: 'Rally and fight normally for a brief time. When rally ends, you are defeated.',
      slot: 'Downed',
      profession: 'Warrior',
      recharge: 20
    },
    'fireball': {
      name: 'Fireball',
      description: 'Cast a fireball at foes that explodes on impact and hits multiple foes.',
      slot: 'Staff',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'lava font': {
      name: 'Lava Font',
      description: 'Make lava erupt from target area.',
      slot: 'Staff',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 6
    },
    'flame burst': {
      name: 'Flame Burst',
      description: '<span class="condition burning">Burn</span> foes at the target location.',
      slot: 'Staff',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 10
    },
    'burning retreat': {
      name: 'Burning Retreat',
      description: 'Quickly <span class="positioning retreat">roll</span> backwards, leaving a wall of fire behind.',
      slot: 'Staff',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'meteor shower': {
      name: 'Meteor Shower',
      description: 'Call down a meteor shower on target area.',
      slot: 'Staff',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 30
    },
    'dragon\'s claw': {
      name: 'Dragon\'s Claw',
      description: 'Fling fire in a claw pattern at your foe.',
      slot: 'Main-hand dagger',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'drake\'s breath': {
      name: 'Drake\'s Breath',
      description: 'Spray a cone of fire at foes while on the move.',
      slot: 'Main-hand dagger',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 5
    },
    'burning speed': {
      name: 'Burning Speed',
      description: '<span class="positioning leap">Sprint ahead</span>, leaving a wall of fire behind.',
      slot: 'Staff',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'ring of fire': {
      name: 'Ring of Fire',
      description: 'Damage nearby foes. Leave behind a ring of fire that <span class="condition burning">burns</span> foes that pass through it.',
      slot: 'Off-hand dagger',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'flame touch': {
      name: 'Flame Touch',
      description: 'Damage your foe. 1.5x damage to <span class="condition burning">burning</span> foes.',
      slot: 'Off-hand dagger',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'flamestrike': {
      name: 'Flamestrike',
      description: 'Strike your foe with a flame.',
      slot: 'Scepter',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'dragon\'s tooth': {
      name: 'Dragon\'s Tooth',
      description: 'Drop an explosive dragon\'s tooth on your foe.',
      slot: 'Scepter',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 6
    },
    'phoenix': {
      name: 'Phoenix',
      description: 'Release a fiery phoenix that first strikes foes in a line, then explodes and returns to heal you.',
      slot: 'Scepter',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'flamewall': {
      name: 'Flamewall',
      description: 'Summon a wall of flame at target area that <span class="condition burning">burns</span> foes.',
      slot: 'Scepter',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'fire shield': {
      name: 'Fire Shield',
      description: 'Envelop yourself in a shield of fire that <span class="condition burning">burns</span> foes.',
      slot: 'Focus',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 30
    },
    'magma orb': {
      name: 'Magma Orb',
      description: 'Shoot a blob of molten rock that explodes after a delay.',
      slot: 'Trident',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'boil': {
      name: 'Boil',
      description: 'Boil the water around your foe.',
      slot: 'Trident',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 10
    },
    'steam': {
      name: 'Steam',
      description: 'Superheat the water around foe, <span class="condition blind">blinding</span> and <span class="condition burning">burning</span> them.',
      slot: 'Trident',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 25
    },
    'lava chains': {
      name: 'Lava Chains',
      description: '<span class="condition crippled">Cripple</span> multiple foes with lava chains.',
      slot: 'Trident',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 30
    },
    'heat wave': {
      name: 'Heat Wave',
      description: '<span class="misc-effect knockback">Knock back</span> foes and <span class="boon regeneration">regenerate</span> allies with a wave of heat.',
      slot: 'Trident',
      tags: ['Fire attunement'],
      profession: 'Elementalist',
      recharge: 40
    },
    'water blast': {
      name: 'Water Blast',
      description: 'Spray a jet of water at foes that also heals allies in the blast radius.',
      slot: 'Staff',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'ice spike': {
      name: 'Ice Spike',
      description: 'Drop a giant ice spike on foes. Causes <span class="condition vulnerability">vulnerability</span>.',
      slot: 'Staff',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 4
    },
    'frozen ground': {
      name: 'Frozen Ground',
      description: 'Coat target area in ice, <span class="condition chilled">freezing</span> foes that cross it.',
      slot: 'Staff',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'geyser': {
      name: 'Geyser',
      description: 'Summon a geyser to heal nearby allies.',
      slot: 'Staff',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'healing rain': {
      name: 'Healing Rain',
      description: 'Call down a healing rain on target area that <span class="boon regeneration">regenerates</span> allies and also removes conditions.',
      slot: 'Staff',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 30
    },
    'vapor blade': {
      name: 'Vapor Blade',
      description: 'Cast a vapor blade that flies out and then returns to you.',
      slot: 'Main-hand dagger',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'cone of cold': {
      name: 'Cone of Cold',
      description: 'Spray an icy blast that damages foes.',
      slot: 'Main-hand dagger',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 3
    },
    'frozen burst': {
      name: 'Frozen Burst',
      description: 'Detonate a burst of ice that <span class="condition chilled">freezes</span> nearby foes.',
      slot: 'Main-hand dagger',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'armor of frost': {
      name: 'Armor of Frost',
      description: 'Protect yourself and allies with frost armor. While active, it <span class="condition chilled">freezes</span> foes that hit you.',
      slot: 'Off-hand dagger',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'healing wave': {
      name: 'Healing Wave',
      description: 'Heal yourself and nearby allies.',
      slot: 'Off-hand dagger',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 25
    },
    'shatterstone': {
      name: 'Shatterstone',
      description: 'Create a shatterstone at the target area that explodes after 2 seconds.',
      slot: 'Scepter',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 2
    },
    'water trident': {
      name: 'Water Trident',
      description: 'Cast a water trident that damages foes and heals allies.',
      slot: 'Scepter',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'freezing gust': {
      name: 'Freezing Gust',
      description: '<span class="condition chilled">Freeze</span> your foe for a brief time.',
      slot: 'Focus',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'comet': {
      name: 'Comet',
      description: 'Drop a comet of ice on target area and <span class="misc-effect daze">daze</span> foes.',
      slot: 'Focus',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 25
    },
    'water missile': {
      name: 'Water Missile',
      description: 'Launch a slow-moving homing missile.',
      slot: 'Trident',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'ice globe': {
      name: 'Ice Globe',
      description: 'Shoot a slow-moving, detonatable icy orb.',
      slot: 'Trident',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 10,
      sequence: ['ice globe', 'ice globe detonate']
    },
    'ice globe detonate': {
      name: 'Ice Globe Detonate',
      description: '(none)',
      slot: 'Trident',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: '?',
      sequence: ['ice globe', 'ice globe detonate']
    },
    'ice wall': {
      name: 'Ice Wall',
      description: 'Summon a wall of ice that you can shatter.',
      slot: 'Trident',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 20,
      sequence: ['ice wall', 'ice wall detonate']
    },
    'ice wall detonate': {
      name: 'Ice Wall Detonate',
      description: '(none)',
      slot: 'Trident',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: '?',
      sequence: ['ice wall', 'ice wall detonate']
    },
    'under current': {
      name: 'Under Current',
      description: '<span class="positioning sink">Drag your foe down</span> into the depths.',
      slot: 'Trident',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'tidal wave': {
      name: 'Tidal Wave',
      description: 'Charge forward with tidal force, <span class="misc-effect knockback">knocking back</span> foes.',
      slot: 'Trident',
      tags: ['Water attunement'],
      profession: 'Elementalist',
      recharge: 10
    },
    'chain lightning (staff)': {
      name: 'Chain Lightning (staff)',
      description: 'Hit multiple foes with arcs of chain lightning.',
      slot: 'Staff',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'lightning surge': {
      name: 'Lightning Surge',
      description: 'Charge a lightning surge that <span class="condition blind">blinds</span> your foe when it discharges.',
      slot: 'Staff',
      tags: ['Air attunement', 'Charge skill'],
      profession: 'Elementalist',
      recharge: 10
    },
    'gust': {
      name: 'Gust',
      description: '<span class="misc-effect knockback">Blast foes backwards</span> with multiple air bursts.',
      slot: 'Staff',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'windborne speed': {
      name: 'Windborne Speed',
      description: 'You and nearby allies gain <span class="boon swiftness">swiftness</span>.',
      slot: 'Staff',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'static field': {
      name: 'Static Field',
      description: 'Create an electrical field that <span class="misc-effect stun">stuns</span> as it appears, if it is crossed and then again as it dissipates.',
      slot: 'Staff',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 30
    },
    'lightning whip': {
      name: 'Lightning Whip',
      description: 'Lash your foe with lightning.',
      slot: 'Main-hand dagger',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'lightning touch': {
      name: 'Lightning Touch',
      description: 'Shock your foe and make them <span class="condition vulnerability">vulnerable</span>.',
      slot: 'Main-hand dagger',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 6
    },
    'shocking aura': {
      name: 'Shocking Aura',
      description: 'Envelop yourself with electrical energy that <span class="misc-effect stun">stuns</span> foes if they attack you.',
      slot: 'Main-hand dagger',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'ride the lightning': {
      name: 'Ride the Lightning',
      description: '<span class="positioning teleport">Ride the lightning</span> to your foe. If you hit a foe other than your target, you stop short and do no damage.',
      slot: 'Off-hand dagger',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'updraft': {
      name: 'Updraft',
      description: 'Gain <span class="boon swiftness">swiftness</span> on a gust of wind that <span class="misc-effect launch">launches</span> nearby foes.',
      slot: 'Off-hand dagger',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'lightning strike': {
      name: 'Lightning Strike',
      description: 'Strike your foe with lightning.',
      slot: 'Scepter',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'arc lightning': {
      name: 'Arc Lightning',
      description: 'Cast an arc of electricity at your foe.',
      slot: 'Scepter',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 4
    },
    'blinding flash': {
      name: 'Blinding Flash',
      description: '<span class="condition blind">Blind</span> your foe with a flash of light.',
      slot: 'Scepter',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 10
    },
    'swirling aura': {
      name: 'Swirling Aura',
      description: 'Create a swirling aura that reflects projectiles.',
      slot: 'Focus',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 25
    },
    'gale': {
      name: 'Gale',
      description: '<span class="misc-effect knockdown">Knock down</span> your foe with a charged wind blast.',
      slot: 'Focus',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 40
    },
    'forked lightning': {
      name: 'Forked Lightning',
      description: 'Launch a streak of lightning that forks on impact, hitting other foes.',
      slot: 'Trident',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'electrocute': {
      name: 'Electrocute',
      description: 'Charge the water around your foe with electricity.',
      slot: 'Focus',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 5
    },
    'air pocket': {
      name: 'Air Pocket',
      description: 'Release a slow-moving, detonatable, air pocket. When it explodes, you <span class="positioning teleport">flash</span> to that location.',
      slot: 'Trident',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 12
    },
    'air bubble': {
      name: 'Air Bubble',
      description: 'Trap your foe in an air bubble and make them <span class="positioning float">rise</span> to surface.',
      slot: 'Trident',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 35
    },
    'lightning cage': {
      name: 'Lightning Cage',
      description: 'Summon an electrical field that <span class="misc-effect stun">stuns</span> foes crossing it.',
      slot: 'Trident',
      tags: ['Air attunement'],
      profession: 'Elementalist',
      recharge: 30
    },
    'stoning': {
      name: 'Stoning',
      description: 'Hurl a rock at your foe and cause <span class="condition weakness">weakness</span>.',
      slot: 'Staff',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'eruption': {
      name: 'Eruption',
      description: 'Shake the ground until it erupts and damages foes.',
      slot: 'Staff',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 6
    },
    'magnetic aura': {
      name: 'Magnetic Aura',
      description: '<span class="technique block">Deflect</span> projectiles with magnetic energy.',
      slot: 'Staff',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'unsteady ground': {
      name: 'Unsteady Ground',
      description: 'Create unsteady ground that <span class="condition crippled">cripples</span> foes that move through it.',
      slot: 'Staff',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'shockwave': {
      name: 'Shockwave',
      description: 'Create a shockwave that <span class="condition bleeding">bleeds</span> and <span class="condition immobilized">immobilizes</span> your target',
      slot: 'Staff',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 20
    },
    'impale (elementalist)': {
      name: 'Impale (elementalist)',
      description: 'Spear your foes on a giant stone spike.',
      slot: 'Main-hand dagger',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'ring of earth': {
      name: 'Ring of Earth',
      description: '<span class="condition bleeding">Bleed</span> foes with a ring of rocky spikes. Gain <span class="boon protection">protection</span>.',
      slot: 'Main-hand dagger',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 6
    },
    'magnetic grasp': {
      name: 'Magnetic Grasp',
      description: '<span class="positioning pull">Pull</span> yourself to your foe with a magnetic force.',
      slot: 'Main-hand dagger',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 12
    },
    'earthquake': {
      name: 'Earthquake',
      description: 'Trigger a quake at your location, <span class="misc-effect knockdown">knocking down</span> foes and dealing massive damage.',
      slot: 'Off-hand dagger',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 30
    },
    'churning earth': {
      name: 'Churning Earth',
      description: 'Hold and release to make nearby earth churn, <span class="condition crippled">crippling</span> foes before unleashing a seismic wave.',
      slot: 'Off-hand dagger',
      tags: ['Earth attunement', 'Channeled'],
      profession: 'Elementalist',
      recharge: 30
    },
    'stone shards': {
      name: 'Stone Shards',
      description: 'Fling stone daggers at your foe to <span class="condition bleeding">bleed</span> them.',
      slot: 'Scepter',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 0
    },
    'rock barrier': {
      name: 'Rock Barrier',
      description: 'Envelop yourself in a stony barrier that improves armor.',
      slot: 'Scepter',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 3,
      sequence: ['rock barrier', 'hurl']
    },
    'hurl': {
      name: 'Hurl',
      description: 'Summon a rock and hurl it at your foe.',
      slot: 'Scepter',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: '?',
      sequence: ['rock barrier', 'hurl']
    },
    'sandstorm': {
      name: 'Sandstorm',
      description: '<span class="condition blind">Blind</span> your foes with a blast of sand.',
      slot: 'Scepter',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 15
    },
    'magnetic wave': {
      name: 'Magnetic Wave',
      description: 'Damage foes, remove conditions, and <span class="technique block">reflect</span> projectiles with a magnetic surge.',
      slot: 'Focus',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 25
    },
    'obsidian flesh': {
      name: 'Obsidian Flesh',
      description: 'Envelop yourself in stony armor making yourself <span class="boon invulnerability">invulnerable</span>.',
      slot: 'Focus',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 50,
      sequence: ['obsidian flesh', 'obsidian flame']
    },
    'obsidian flame': {
      name: 'Obsidian Flame',
      description: 'Release your <span class="skill">Obsidian Flesh</span> in a strike of Obsidian Flame',
      slot: 'Focus',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: '?',
      sequence: ['obsidian flesh', 'obsidian flame']
    },
    'rock blade': {
      name: 'Rock Blade',
      description: 'Shoot a rocky blade at your foe.',
      slot: 'Trident',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'rock spray': {
      name: 'Rock Spray',
      description: 'Spray gravel in a cone pattern to <span class="condition bleeding">bleed</span> foes.',
      slot: 'Trident',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 12
    },
    'magnetic current': {
      name: 'Magnetic Current',
      description: '<span class="positioning pull">Pulls</span> you to your foe and <span class="condition immobilized">immobilizes</span> them.',
      slot: 'Trident',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 18
    },
    'rock anchor': {
      name: 'Rock Anchor',
      description: 'Anchor a rock to your foe, making them <span class="positioning sink">sink</span>.',
      slot: 'Trident',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 35
    },
    'murky water': {
      name: 'Murky Water',
      description: '<span class="condition blind">Blind</span> foes around you.',
      slot: 'Trident',
      tags: ['Earth attunement'],
      profession: 'Elementalist',
      recharge: 45
    },
    'ether renewal': {
      name: 'Ether Renewal',
      description: 'Heal yourself and lose a condition with every pulse.',
      slot: 'Healing',
      tags: ['Channeled'],
      profession: 'Elementalist',
      recharge: '?'
    },
    'glyph of elemental harmony': {
      name: 'Glyph of Elemental Harmony',
      description: 'Heal yourself. <span class="signature-label">Fire:</span> Gain <span class="boon might">might</span>. <span class="signature-label">Air:</span> Gain <span class="boon swiftness">swiftness</span>. <span class="signature-label">Water:</span> <span class="boon regeneration">Regenerate</span>. <span class="signature-label">Earth:</span> Gain <span class="boon protection">protection</span>.',
      slot: 'Healing',
      type: 'Glyph',
      profession: 'Elementalist',
      recharge: 20
    },
    'signet of restoration': {
      name: 'Signet of Restoration',
      description: '<span class="signature-label">Passive: </span>Gain health every time you cast a spell. <span class="signature-label">Active:</span> Heal yourself.',
      slot: 'Healing',
      type: 'Signet',
      profession: 'Elementalist',
      recharge: 40
    },
    'arcane shield': {
      name: 'Arcane Shield',
      description: '<span class="technique block">Block</span> attacks with an arcane energy shield. If it blocks 3 attacks it explodes.',
      slot: 'Utility',
      profession: 'Elementalist',
      recharge: 75
    },
    'cleansing fire': {
      name: 'Cleansing Fire',
      description: 'Remove all conditions and break out of <span class="misc-effect stun">stun</span>. Set enemies <span class="condition burning">on fire</span>.',
      slot: 'Utility',
      profession: 'Elementalist',
      recharge: 30
    },
    'energy blast': {
      name: 'Energy Blast',
      description: 'Hold and release to shoot an arcane blast. The longer held, the more energy you\'ll expend for damage.',
      slot: 'Utility',
      tags: ['Charge skill'],
      profession: 'Elementalist',
      recharge: 45
    },
    'lightning flash': {
      name: 'Lightning Flash',
      description: '<span class="positioning teleport">Flash</span> to target area.',
      slot: 'Utility',
      profession: 'Elementalist',
      recharge: 60
    },
    'conjure flame': {
      name: 'Conjure Flame',
      description: 'Conjure three Lava Axes for you and your allies.',
      slot: 'Utility',
      type: 'Conjure',
      profession: 'Elementalist',
      recharge: 90
    },
    'conjure frost': {
      name: 'Conjure Frost',
      description: 'Conjure three frost bows for you and your allies.',
      slot: 'Utility',
      type: 'Conjure',
      profession: 'Elementalist',
      recharge: 90
    },
    'conjure lightning': {
      name: 'Conjure Lightning',
      description: '(none)',
      slot: 'Utility',
      type: 'Conjure',
      profession: 'Elementalist',
      recharge: 90
    },
    'conjure earth': {
      name: 'Conjure Earth',
      description: '(none)',
      slot: 'Utility',
      type: 'Conjure',
      profession: 'Elementalist',
      recharge: 90
    },
    'mist form': {
      name: 'Mist Form',
      description: 'Transform into an <span class="misc-effect invulnerability">invulnerable</span>, vaporous mist for a brief time. Duration: 3 seconds',
      slot: 'Utility',
      type: 'Form',
      profession: 'Elementalist',
      recharge: 75
    },
    'glyph of arcane power': {
      name: 'Glyph of Arcane Power',
      description: 'All of your attacks are critical hits. Duration: 20 seconds',
      slot: 'Utility',
      type: 'Glyph',
      profession: 'Elementalist',
      recharge: 45
    },
    'glyph of concentration': {
      name: 'Glyph of Concentration',
      description: 'You cannot be <span class="misc-effect knockdown">knocked down</span>, <span class="misc-effect stun">stunned</span>, <span class="condition chilled">chilled</span> or <span class="misc-effect launch">launched</span>.',
      slot: 'Utility',
      type: 'Glyph',
      profession: 'Elementalist',
      recharge: '?'
    },
    'glyph of elemental storage': {
      name: 'Glyph of Elemental Storage',
      description: '(none)',
      slot: 'Utility',
      type: 'Glyph',
      profession: 'Elementalist',
      recharge: '105'
    },
    'signet of fire': {
      name: 'Signet of Fire',
      description: '<span class"signature-label">Passive:</span> You gain <span class="boon fury">fury</span>. <span class"signature-label">Active:</span> <span class="condition burning">Burn</span> your foe.',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Elementalist',
      recharge: 45
    },
    'signet of water': {
      name: 'Signet of Water',
      description: '<span class="signature-label">Passive:</span> You cleanse a condition every three seconds. <span class="signature-label">Active:</span> <span class="condition chilled">Freeze</span> your foe',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Elementalist',
      recharge: 45
    },
    'signet of air': {
      name: 'Signet of Air',
      description: '<span class="signature-label">Passive:</span> Gain <span class="boon swiftness">swiftness</span>. <span class="signature-label">Active:</span> <span class="condition blind">Blind</span> your target and nearby foes.',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Elementalist',
      recharge: 30
    },
    'signet of earth': {
      name: 'Signet of Earth',
      description: '<span class="signature-label">Passive:</span> You gain <span class="boon protection">protection</span>. <span class="signature-label">Active:</span> <span class="condition immobilized">Immobilize</span> foe.',
      slot: 'Utility',
      type: 'Signet',
      profession: 'Elementalist',
      recharge: '?'
    },
    'fiery greatsword': {
      name: 'Fiery Greatsword',
      description: 'Summon and wield a fiery greatsword.',
      slot: 'Elite',
      type: 'Conjure',
      profession: 'Elementalist',
      recharge: 180
    },
    'tornado': {
      name: 'Tornado',
      description: 'Become a mobile tornado that causes massive damage and <span class="misc-effect launch">launches</span> enemies.',
      slot: 'Elite',
      type: 'Form',
      profession: 'Elementalist',
      recharge: 180
    },
    'grasping earth': {
      name: 'Grasping Earth',
      description: 'Summon hands that erupt from the ground and <span class="condition immobilized">immobilize</span> your foe.',
      slot: 'Downed',
      profession: 'Elementalist',
      recharge: 4
    },
    'discharge lightning': {
      name: 'Discharge Lightning',
      description: 'Blast your foe with lightning.',
      slot: 'Downed',
      profession: 'Elementalist',
      recharge: '?'
    },
    'vapor form': {
      name: 'Vapor Form',
      description: 'Assume a mobile, vaporous form. Vapor Form effect: Turn into a Vapor. When it ends, you become downed again.',
      slot: 'Downed',
      type: 'Form',
      profession: 'Elementalist',
      recharge: 45
    },
    'fire attunement': {
      name: 'Fire Attunement',
      description: 'Attune to fire, change your weapon spells and <span class="condition burning">scorch</span> nearby foes with a fiery blast.',
      slot: 'Profession mechanic',
      type: 'Attunement',
      profession: 'Elementalist',
      recharge: '10 / 20'
    },
    'water attunement': {
      name: 'Water Attunement',
      description: 'Attune to water, change your weapon spells and soothe nearby allies with a healing splash. Water Attunement effect: Gives target water skills. Grants Soothing Mist.',
      slot: 'Profession mechanic',
      type: 'Attunement',
      profession: 'Elementalist',
      recharge: '10 / 20'
    },
    'air attunement': {
      name: 'Air Attunement',
      description: 'Attune to air, change your weapon spells and shock nearby foes with lightning.',
      slot: 'Profession mechanic',
      type: 'Attunement',
      profession: 'Elementalist',
      recharge: '10 / 20'
    },
    'earth attunement': {
      name: 'Earth Attunement',
      description: 'Attune to earth, change your weapon spells, and slam nearby foes with a seismic blast.',
      slot: 'Profession mechanic',
      type: 'Attunement',
      profession: 'Elementalist',
      recharge: '10 / 20'
    }
  };

}).call(this);
