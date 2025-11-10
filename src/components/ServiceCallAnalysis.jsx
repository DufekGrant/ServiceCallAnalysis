import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const ServiceCallAnalysis = () => {
  const transcriptRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);

  // Your actual transcript mapped to sections
  const transcriptSections = [
    // Introduction
    { id: 'introduction', title: 'Introduction', time: '00:00', speaker: 'Customer', text: 'Hello.' },
    { id: 'introduction', time: '00:01', speaker: 'Technician', text: 'Hey, Luis. Got you all done. The reason that took so long is I. I just kind of also built all your equipment options when I was out there too.' },
    { id: 'introduction', time: '00:08', speaker: 'Customer', text: 'Okay, sure.' },
    { id: 'introduction', time: '00:10', speaker: 'Technician', text: "I'd love to wrap up with you here." },
    { id: 'introduction', time: '00:12', speaker: 'Customer', text: 'Of course, of course.' },
    { id: 'introduction', time: '00:14', speaker: 'Technician', text: 'So what are you up to for the rest of the day?' },
    { id: 'introduction', time: '00:16', speaker: 'Customer', text: 'Oh, keep working. Yeah, yeah, most of the. Most of the day. Sometimes I go through.' },
    { id: 'introduction', time: '00:20', speaker: 'Technician', text: "I literally can't work from anywhere else but your home." },
    { id: 'introduction', time: '00:23', speaker: 'Customer', text: 'I know.' },
    
    // Problem Diagnosis
    { id: 'diagnosis', title: 'Problem Diagnosis', time: '00:24', speaker: 'Technician', text: "Yeah. AI is a big thing, man. But so just to. Let's go right to just the differences here. I just wanted to show you. So remember before how we had that before that below freezing temperature at 41. It's good to see. And now we have that 20 degree difference as well. Did a really fancy charge there for you and got you in good shape. All that to say. Definitely. Bandaid. Sure." },
    { id: 'diagnosis', time: '00:48', speaker: 'Customer', text: 'Yeah.' },
    { id: 'diagnosis', time: '00:49', speaker: 'Technician', text: 'It is old.' },
    { id: 'diagnosis', time: '00:50', speaker: 'Customer', text: "It's an old unit." },
    { id: 'diagnosis', time: '00:52', speaker: 'Technician', text: "Right. So when it comes to just what to expect here in the future, I would say month to two months. I think we'll start to see. Or even sooner we'll start to see the efficiency drop again. And we still have those mold issues. I did just want to show you some different equipment options." },
    { id: 'diagnosis', time: '01:05', speaker: 'Customer', text: 'Of course.' },
    
    // Solution Explanation
    { id: 'solution', title: 'Solution Explanation', time: '01:06', speaker: 'Technician', text: 'Oh, my goodness. Who is this?' },
    { id: 'solution', time: '01:08', speaker: 'Customer', text: 'Yeah, this is Michelangelo.' },
    { id: 'solution', time: '01:10', speaker: 'Technician', text: 'Michelangelo. I love cats. Get out of here. Aww. I have two cats and three dogs at home. So we have quite the chaos household.' },
    { id: 'solution', time: '01:18', speaker: 'Customer', text: 'We have two cats.' },
    { id: 'solution', time: '01:19', speaker: 'Technician', text: "There you go. Yeah. So the two equipment options, or there's a total of four that I built. There's either we replace like for like, which will naturally be more efficient, even though it's just going to be the updated version of what you have. It's going to be a new furnace, new coil, new condenser, higher sear rating, better efficiency, but still like the same type of equipment. The next step beyond that is maintaining gas heating, electric cooling, but upgrading efficiency. And the interesting thing about that is that actually ends up being the most expensive one of the four that I've built. Are you familiar with natural gas phase outs?" },
    { id: 'solution', time: '01:53', speaker: 'Customer', text: 'No.' },
    { id: 'solution', time: '01:54', speaker: 'Technician', text: "Okay. So it is something like, let's say, for instance, we have stove tops being phased out. We do have gas water heaters being phased out. We have gas furnaces being phased out. Are you familiar with what California's goal is in every." },
    { id: 'solution', time: '02:07', speaker: 'Customer', text: 'Yeah, some of that.' },
    { id: 'solution', time: '02:09', speaker: 'Technician', text: "Yeah, I like the idea. It's just kind of a lot. They want every house to have a 200amp panel, have a bathtub generator. They want every house to have solar, and they want every house to have a heat pump. And so heat Pumps are the next option. Yeah, heat pumps are actually just got introduced some more rebates. So even though those are the best possible system to install, weirdly enough, those actually are getting quite affordable at the moment. I'm used to them being actually our most expensive option. But rebates have been introduced that have made it a lot more reasonable. And then when it comes to the. The two different heating options, I just have two different types of heat pumps that I'm building for you. So let's just look at." },
    { id: 'solution', time: '02:50', speaker: 'Customer', text: 'I like to like higher efficiency and then two different. Still same technology and then two heat pumps.' },
 
    // Upsell Attempts
    { id: 'upsell', title: 'Upsell Attempts', time: '02:57', speaker: 'Technician', text: "Exactly. And so to start off with, it's always important to realize these are more expensive than investments than your normal investment into a home. So I just wanted you to understand that a lot of our clients do use different monthly options to take care of them. But let's just break down what we do. So let's start off with the like for like we always come with our guarantees. We have some really, really excellent guarantees that really just show you that we're going to do a great job for you. We then start off with our first cost. This is a newest nest thermostat. We can switch this up. I just wanted to just simplify it, put something in that you guys are used to. It will be just the most modern version. And then we credit this back towards replacement at the very end. So this 549 will be credited back towards you. Then we talk about steps like what we need to do. AC removal, hall away and disposal, heater and removal. This is a really lengthy section. This is like typically roughly one day, this amount of work we remove, safely, demolish and dispose of your furnace, remove safely, remove the refrigerant, demolish and dispose of your ac. And that's I think like a pretty lengthy section." },
    { id: 'upsell', time: '04:02', speaker: 'Customer', text: 'Got it.' },
    { id: 'upsell', time: '04:03', speaker: 'Technician', text: "This next one may or may not come up, but I am including it as a line item just in case it becomes relevant. Sometimes when we have water damage, I do see decayed plywood in sections where there could be like mold growth or anything like that. If we're seeing anything like that, we just cut that plywood out and put new plywood in." },
    { id: 'upsell', time: '04:20', speaker: 'Customer', text: 'Okay.' },
    { id: 'upsell', time: '04:21', speaker: 'Technician', text: "That's in the inside." },
    { id: 'upsell', time: '04:22', speaker: 'Customer', text: 'Oh yeah.' },
    { id: 'upsell', time: '04:23', speaker: 'Technician', text: "Next. The new system is not going to be the same dimensions. It's going to be a little bit smaller or a little bit wider, a little bit taller or something around there. And we do have to make sure the sheet metal connections fit to it. We do any sheet metal necessary." },
    { id: 'upsell', time: '04:36', speaker: 'Customer', text: 'Of course.' },
    { id: 'upsell', time: '04:37', speaker: 'Technician', text: "Outside we have A fuse box. That's where I remove it and work on it safely. We just put a new one in for you. All the new electrical. There will be some new electrical in there. Currently there's a little on off switch in there called a safety shut off. We always come with a new one. Any new thermostat, wiring or connections, any new electrical whips, we install that for you. We have circuit breakers on the ac. We just prefer to have a brand new circuit breaker. So we just include that with it. Thermostat wire, communication wire. This just means if there is a need to rerun a thermostat wire, we absolutely would. And then H Vac permanent. We always pull permits. There is a caveat for permit pulling. Usually they like to do a HERS test as well. Have you ever heard of that before?" },
    { id: 'upsell', time: '05:18', speaker: 'Customer', text: "No, I don't know what the HERS test is. It's like an efficiency." },
    { id: 'upsell', time: '05:22', speaker: 'Technician', text: "It's a home efficiency test. And I do know right now your home would not pass a HERS test because of the condition of the ducting and a little bit of your insulation too. So we love to do HERS tests. But in order for us to feel confident in doing that, we would need to do a little bit with your ducting or consider modifying it. What that would look like is something. We do have a promotion going on currently is sealing your ductwork, which just means no replacement. But we go to every single connection and seal it thoroughly and then we can include a test. If we do that next. This is the total cost of four R&E discounts. I do have a fair amount of discounts that I've included. This is again the like for like option. And just to explain what it comes with, I explained R410A. The refrigerant got phased out. We have the newest style here, R32. This is basically just the new standard for refrigerant. It is considered to be better for the environment. It's just much less harmful to ozone layers in general. 35% cooling savings, 30% heating savings. It is going to be the same similar type of technology. The sear rating is up. You currently have a 12 seer. We install a 15 and then we always include standard filtration for you as basic. The motor is an improvement. So the fan motor inside of the system is an improvement. Way more reliable and way quieter. That's basically what this comes with now. A really cool thing. 10 year manufacturer warranty, 10 year compressor warranties. If you're on this maintenance program with us, we actually completely match the manufacturer warranties. It's essentially 10 years parts and 10 year manufacturer warranty. And then moving on, we'll just get to the first heat pump. Really very similar line items. I'm not going to go through every single one this time. I wanted to pause at this one though. The technology we're talking about with this heat pump is called an inverter. Have you ever heard of an inverter before?" },
    { id: 'upsell', time: '07:36', speaker: 'Customer', text: 'I have, yeah.' },
    { id: 'upsell', time: '07:37', speaker: 'Technician', text: "Actually, you know what? I saw your mini split. It actually mimics that technology, but in a ducted sense. So that's a ductless heating and cooling system. This one we have that same type of inverter technology where it ramps up and ramps down, except we're just attaching it to the ductwork. So the main difference here just important to realize that it's going to heat and cool a little bit differently. In general, everything is going to be an improvement. Cooling will be significantly better. Usually we're talking like 60% utility bill savings. The thing about heating side, it's just important to note usually they don't absolutely kill it the same way old furnaces do. Old furnaces have flames. So obviously we're going to get really intense temperature coming out. These do heat a little bit less extreme, but still are totally capable of." },
    { id: 'upsell', time: '08:15', speaker: 'Customer', text: "I'm familiar with the heat pump." },
    
    
    // Maintenance Plan
        { id: 'maintenance', title: 'Maintenance Plan Offer', time: '08:17', speaker: 'Technician', text: "You know about these? Okay, perfect. Everything else is the same. AC removal, hallway disposal, heater removal, plywood circuit breaker, thermostat permit. And there's the price before any discounts or rebates. We then have our discounts and rebates, which I realize I didn't include on the other option here. But starting off, this existed on your other estimate too, is $1,800 off because we're able to reuse the copper line set. Very resilient to timing corrosion. If my install crew does determine that your H Vac leak that you have right now is in your copper line, we just still take care of it. But even with this savings in place, next, we have the thermostat credit back towards you. And this is where we have some rebates. So Silicon Valley Clean Energy. I did just want to confirm, did you opt out of this program? You would have to manually opt out of it." },
    { id: 'maintenance', time: '09:10', speaker: 'Customer', text: "Yeah, I didn't." },
    { id: 'maintenance', time: '09:11', speaker: 'Technician', text: "Okay, so you're good. So Silicon Valley Clean energy is a $2,500 off towards heat pump updates. Next we have tech which is one that just barely got reintroduced like yesterday. So that's, that's really cool that it got introduced. And 1500 off here. What this is is the fact that we're removing both a furnace and AC qualifies you for this higher end one. So we handle what we need to handle. There are things that you need to physically go in and do. The only one for the SVCE is you do. And this will be in a contract that you can just click on easily. You do need to submit a full PG and E bill. Like every bit, every page off a PG and E bill, and then we do the rest. What they need from us is proof that we've installed a inverter system and the manufacturer label. We take care of that." },
    { id: 'maintenance', time: '09:55', speaker: 'Customer', text: 'Got it.' },
    { id: 'maintenance', time: '09:56', speaker: 'Technician', text: "For tech. Let's see. I think we just take care of this one for you, so. Oh, you know what? This one does require a HERS test to be done. So for this area, I would love to include one of our promotions for you, which is where we just include a duct seal. And that would be something I can definitely do. So if that passes a HERS test, I think you're all good. Mm. So your client has clear record with the city. Yeah. As long as you have no failed permits, then it should pass." },
    { id: 'maintenance', time: '10:25', speaker: 'Customer', text: 'Failed permits, meaning like, you tried to.' },
    { id: 'maintenance', time: '10:28', speaker: 'Technician', text: "Pull a permit and it didn't work or passed. It didn't pass inspection." },
    { id: 'maintenance', time: '10:32', speaker: 'Customer', text: 'I see. I see. For this. For your homework. For your homework. Because there was something. Okay, no problem.' },
    { id: 'maintenance', time: '10:38', speaker: 'Technician', text: "Okay. So it looks like you would qualify for this. The next option will go to." },
    { id: 'maintenance', time: '10:43', speaker: 'Customer', text: 'And what was that option?' },
    { id: 'maintenance', time: '10:45', speaker: 'Technician', text: 'Oh, total price.' },
    { id: 'maintenance', time: '10:47', speaker: 'Customer', text: 'No, no. What was that option that you showed me? I. Yep.' },
    { id: 'maintenance', time: '10:50', speaker: 'Technician', text: "So you can actually see what's kind of funny is it's relatively around the same price as a gap and actually a little bit less expensive, weirdly. And what's really cool, I was actually talking to Alex that I was really impressed. I just built your best possible heat pump. This is like our branded unit. It's a daikin. Daikin we love to work with because they really like us. If you ever look up daikin products on Google and you look up, like, install videos, you'll actually see my company installing them because we do the worldwide training for how to install daikin, so we just have a great partnership with them. So we like to install them. But what's interesting is Bryant does have a corner on a type of technology. Heat pumps, on occasion enter a defrost cycle, which is where it briefly stops heating and it just runs itself alone to heat itself back up. These are known to not really enter that. And the brilliant. And it's just because of the way their coils are built, they have a better Type of metal derivative in it that is better at dissipating its own heat and keeping itself warm." },
    { id: 'maintenance', time: '11:48', speaker: 'Customer', text: 'Warm.' },
    { id: 'maintenance', time: '11:49', speaker: 'Technician', text: "The only time these ever enter defrost, which we won't ever get to here in California, Is when they enter 18 degrees Fahrenheit. So it just won't happen. And it's just really funny if we look at like the really high end furnace. It's just like. We really climbed the cost. I just. It's substantial." },
    { id: 'maintenance', time: '12:05', speaker: 'Customer', text: 'None of this option is moving the unit to the top.' },
    { id: 'maintenance', time: '12:08', speaker: 'Technician', text: "No. Currently I haven't built that. We do have an attic package. I would actually have to modify these estimates to do that. The reason I'm starting like this is just. I just wanted you to understand what it would look like to keep it in the closet. So when it comes to keeping it in the closet, we are completely fine moving it to your attic. Completely fine. The thing I like to make sure my clients understand is serviceability, maintenance and efficiency. That is the best location." },
    { id: 'maintenance', time: '12:35', speaker: 'Customer', text: "Yeah. Because it's too hot up there." },
    { id: 'maintenance', time: '12:37', speaker: 'Technician', text: 'Precisely.' },
    { id: 'maintenance', time: '12:38', speaker: 'Customer', text: 'What about moving it to the garage?' },
    { id: 'maintenance', time: '12:40', speaker: 'Technician', text: 'That would be way harder. Harder.' },
    { id: 'maintenance', time: '12:42', speaker: 'Customer', text: 'Harder.' },
    { id: 'maintenance', time: '12:43', speaker: 'Technician', text: "So much more work. And we would actually be forced to replace your ductwork entirely. And. And with this. The benefit of moving out to the attic, though, is you do get a full closet. In general, it is a pretty. In regards to airflow that enters the home, It's a pretty nice spot. It's just we do have to do some modifications. So just to explain an attic install, that intake would no longer be used. We would add one probably close to the center of the house. And our systems are very quiet. But it is just something that we will have airflow here now. And then we do have to run some new electrical. If we're not doing a new gas line, that's great. But we do have to install. We would have to install the intake here. And yeah. Closet systems, in regards to what the system itself likes is the best location. But at the end of the day, the systems are built for you. So if we're moving it to the attic completely fine. I kind of forget at the top of my head how much it adds to the project. It is depending on the severity of necessary. I do think it adds at least 4,000 to it. But on the highest end, it would involve new ductwork. And then we add a fair amount to it." },
    { id: 'maintenance', time: '13:45', speaker: 'Customer', text: "Okay. Okay. Yeah. What we don't like about it there is not so much the cabinet is the noise." },
    { id: 'maintenance', time: '13:51', speaker: 'Technician', text: 'So the sway client or any of.' },
    { id: 'maintenance', time: '13:53', speaker: 'Customer', text: 'Our units, that noise would be better.' },
    { id: 'maintenance', time: '13:55', speaker: 'Technician', text: "And what I can even do as an extra way to make that noise even better is if we swap the grill. So the grill right now has louvers. Right. So when an airflow is pulled in and it does this, that naturally creates noise. We can install an egg carton version that has a square squares instead. And it's much, much, much, much better for airflow. And when that happens, it makes it a lot quieter, too. I did do a test one time on no change other than the grill, and it did decrease noise by 20% when I did that. So 20% quieter, it would still get on the noise. Not. It would be much less noisy than this. But if we did do the basic furnace, that's not going to be as quiet. But if we talk about inverters, those actually can sometimes be hard, at least even on type of thing. Do you even hear it running?" },
    { id: 'maintenance', time: '14:40', speaker: 'Customer', text: 'That makes sense. I can hear it with the split unit.' },
    { id: 'maintenance', time: '14:43', speaker: 'Technician', text: "Yeah. So, yeah, that technology gets introduced here. All that to say if there's an inclusive, incredible cooling demand, it still will pull a lot of airflow into itself, but that won't happen that consistently. It would happen when it breaks 100 or when it's 105. Then it might be. It'll still be quieter than that, but it will get to like equivalent air pressure going across itself." },
    { id: 'maintenance', time: '15:05', speaker: 'Customer', text: 'Okay, okay. All right. So the options I have are. Can I see the prices again? Yeah, so.' },
    { id: 'maintenance', time: '15:12', speaker: 'Technician', text: "So all of these are going to be great options for you. I do have to take this call. Feel free to review this. Hello? Okay, I'm still talking to our client here about different options. So I don't know. Yeah." },
    { id: 'maintenance', time: '15:25', speaker: 'Customer', text: 'I see that all these are. This one bent to the side.' },
    { id: 'maintenance', time: '15:29', speaker: 'Technician', text: "Yes. That's a big difference too, is amount of room taken up outside. These are going to be taller systems. So it is actually. You know what, it'll be very, very, really, really close to the same height, but they're like this thin. But they go. They go wide, though." },
    { id: 'maintenance', time: '15:45', speaker: 'Customer', text: "Yeah, yeah, yeah. But my experience with the other one is that it vents to the side, so it's kind of windy." },
    { id: 'maintenance', time: '15:50', speaker: 'Technician', text: 'It still will. It still will.' },
    { id: 'maintenance', time: '15:52', speaker: 'Customer', text: 'Yeah. And what I like about this one is that it vents to the top.' },
    { id: 'maintenance', time: '15:56', speaker: 'Technician', text: 'I. I can build a form of inverter that does do that.' },
    { id: 'maintenance', time: '15:59', speaker: 'Customer', text: 'Yeah.' },
    { id: 'maintenance', time: '16:00', speaker: 'Technician', text: "If that's a." },
    { id: 'maintenance', time: '16:01', speaker: 'Customer', text: 'So they have these unit that bends upwards.' },
    { id: 'maintenance', time: '16:04', speaker: 'Technician', text: "Yep. The brand is Bosch. Very highly reviewed. Mostly actually highly reviewed from technicians, which is very cool. Technicians love working on them because they're very reliable. But I don't know where the Bosch would end up. But I do think it would be roughly in that same area. The only thing we can find out with Bosch in a second. But you see how this says Energy Star, high heat. Mm. Whenever you see Energy Star, that actually can qualify you for one further rebate that you have to deal with completely on your own. We can't help you. It's a tax cut rebate. And usually if you qualify for it, it's either a thousand dollars or $2,000. If we don't have Energy Star on it, you can't have that rebate." },
    { id: 'maintenance', time: '16:40', speaker: 'Customer', text: "And Bosch doesn't have that." },
    { id: 'maintenance', time: '16:42', speaker: 'Technician', text: 'I can find out.' },
    { id: 'maintenance', time: '16:43', speaker: 'Customer', text: 'Okay, okay, okay. Got it, got it.' },
    { id: 'maintenance', time: '16:46', speaker: 'Technician', text: 'Want me to just find out real quick?' },
    { id: 'maintenance', time: '16:48', speaker: 'Customer', text: 'Sure, sure.' },
    { id: 'maintenance', time: '16:49', speaker: 'Technician', text: 'Okay. Let me just modify this estimate to.' },
    { id: 'maintenance', time: '16:52', speaker: 'Customer', text: 'Be a Bosch, but leave that one there.' },
    { id: 'maintenance', time: '16:54', speaker: 'Technician', text: "I will. I'm just going to duplicate it and we'll switch it over to a Bosch. Okay. It does have Energy Star. So the difference is this one will have. It won't have the high heat feature. So let me just get. Where did I put that estimate as this one? Right. There we go. It. Okay. So now we have. It's funny. They all end up being in the same price range. So it's again, in regards to technology, the only thing that the Bryant has over the other ones is that it doesn't enter defrost as often. In California, though, we really don't enter." },
    { id: 'maintenance', time: '17:30', speaker: 'Customer', text: 'Are defrosting. I had a heat pump before in another place. Never had a problem with it. Yeah, 20 years ago.' },
    { id: 'maintenance', time: '17:37', speaker: 'Technician', text: "And it was here in California. Yeah. So I think it's just. It will just very rarely enter a defrost cycle. But this one just has that better feature. Yeah, exactly." },
    { id: 'maintenance', time: '17:47', speaker: 'Customer', text: 'Yeah. Okay. Okay. And how long does it take to install the system?' },
    { id: 'maintenance', time: '17:52', speaker: 'Technician', text: "If we are doing a heat pump, it's going to be roughly two or three days. Because there is a lot of work that goes into a heat pump. If it was a gas system to existing ac, I would say one to two days. And then there is still a promotion. I haven't even included any of these. And that would be duct sealing. And those that also can take close to a day too. But depending on time frames, we have an install crew or two out here for you. If you have two, it really speeds up things." },
    { id: 'maintenance', time: '18:20', speaker: 'Customer', text: 'Things up.' },
    { id: 'maintenance', time: '18:21', speaker: 'Technician', text: "So that's either two guys or four guys." },
    { id: 'maintenance', time: '18:23', speaker: 'Customer', text: 'Okay. Okay. And all right. I understand the options. That\'s fine. I\'m not. I would be interested on. On, on the heat pump. Maybe these, these two. I\'m not interested on the gas.' },
    { id: 'maintenance', time: '18:35', speaker: 'Technician', text: 'Sure.' },
    { id: 'maintenance', time: '18:36', speaker: 'Customer', text: 'And I guess. And then the other thing I noticed is that you also have financing.' },
    { id: 'maintenance', time: '18:41', speaker: 'Technician', text: 'I do, yeah.' },
    { id: 'maintenance', time: '18:42', speaker: 'Customer', text: 'You go, so for financing, can you show me the monthly payment and for how long is that?' },
    { id: 'maintenance', time: '18:47', speaker: 'Technician', text: "So we have. We have. Let's go to the Bosch, since that's the one that you like the idea of having airflow up. We'll look at financing. So we'll look at wintime offers July. So these are just all of our options that we have. So we have 120 month, 8.99 interest with autopay. So you don't have to do anything. 180. So much longer term with 9.99. This is our most. These two are our most commonly used. Good leap, actually just barely just gave us access to this this month. It was supposed to end on the 15th, so I'm surprised it's still going on. But the 12 months, no interest just means that if you do pay it off in 12 months, you just pay the same as cash. Like there's no interest rate or anything. This is just a very common one because the low interest rate and it just goes on for a little bit of a longer term. And yeah, I think when it comes to this one that we're seeing." },
    { id: 'maintenance', time: '19:40', speaker: 'Customer', text: 'When.' },
    { id: 'maintenance', time: '19:41', speaker: 'Technician', text: "It comes to this payment that we're seeing there, that's including the 5.991 for this, for the 60 months." },
    { id: 'maintenance', time: '19:48', speaker: 'Customer', text: '60 months.' },
    { id: 'maintenance', time: '19:49', speaker: 'Technician', text: '5 years of.' },
    { id: 'maintenance', time: '19:49', speaker: 'Customer', text: '5 year 335. And that. That includes the promotions area.' },
    { id: 'maintenance', time: '19:49', speaker: 'Technician', text: "Yeah, there's still some line items in regards to promotions I haven't included. But this is baseline equipment." },
    // Closing
    { id: 'closing', title: 'Closing & Thank You', time: '20:15', speaker: 'Customer', text: "Of course, I get it. Okay, so look, I like to speak with my wife about all the options. Email me these and then of course I'll. Let's cover the what you did today and then I'll just discuss this with my wife." },
    { id: 'closing', time: '20:25', speaker: 'Technician', text: "Sure. Yeah." },
    { id: 'closing', time: '20:26', speaker: 'Customer', text: "I like the idea of the thing being quieter and more efficient." },
    { id: 'closing', time: '20:30', speaker: 'Technician', text: "Yeah." },
    { id: 'closing', time: '20:31', speaker: 'Customer', text: "And not having gas leaks in the future." },
    { id: 'closing', time: '20:35', speaker: 'Technician', text: "Yeah. So how about this? Let me bring the estimates down to just two of them. I'll just eliminate this one, eliminate that one. And the only thing I just want to make sure is clear on my end it would be so much easier if I didn't have to charge for the repair today and if we actually just basically considered it as a complimentary thing for you. So if we did feel comfortable with signing what that would just look like on your end would just be a $1,000 down payment. The other thing is we can see what options you qualify for in regards to financing. And if that's the case, if we have financing, then I don't even need a down payment today. We would just do just the financing side of it. And we do come with. Every contractor that's reputable comes with this guarantee here. So as you're talking to your wife, anything weird comes up, we even have this notice right here. So we always have a reputable three day right to cancel." },
    { id: 'closing', time: '21:25', speaker: 'Customer', text: "No, we won't do that today. Just send me the, I'll talk to her and then we'll make a decision." },
    { id: 'closing', time: '21:30', speaker: 'Technician', text: "Absolutely. And then within 15 days I will completely credit that back towards it. Okay. So I'm gonna pretty his estimates up a little bit more and I'll include, include the duct sealing promotion. And because tech is needing a hers test, we actually just kind of have to do that anyways. So I'm going to modify it a little bit. And what you'll see that's new when I send it to you is permit and hers test. You'll see a duct seal cost. But then if you keep scrolling down, you would see a it credited back as a promotion, so. So, great. We'll go ahead. I'll eliminate the both of the gas options and we'll stay with the Bryant and the Bosch. Yes, and very cool. And let me go ahead and get the $1,000 for today. 1,900. So do you need a Visa or MasterCard?" },
    { id: 'closing', time: '22:15', speaker: 'Customer', text: "I think it's a MasterCard. If I can find it." },
    { id: 'closing', time: '22:18', speaker: 'Technician', text: "Always important." },
    { id: 'closing', time: '22:19', speaker: 'Customer', text: "There you go." },
    { id: 'closing', time: '22:20', speaker: 'Technician', text: "Great." },
    { id: 'closing', time: '22:21', speaker: 'Customer', text: "It's on the back." },
  ];

  const analysisCategories = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: '👋',
      summary: 'Initial greeting and rapport building',
      rating: 'Poor',
      analysis: 'The technician did not properly greet the customer as he did not introduce himself or the company. From the transcription, it appears this conversation follows the completion of maintenance. It is possible the technician properly introduced themselves when first meeting with the client, but it was not included in the transcription, thus the introduction is insufficient.'
    },
    {
      id: 'diagnosis',
      title: 'Problem Diagnosis',
      icon: '🔍',
      summary: 'Review of current system issues and temporary fix',
      rating: 'Fair',
      analysis: 'Due to this transcription being a follow up conversation, it did not include the technician inquiring about the customer’s issue. From the context of the conversation it seems that the technician did this in a conversation that took place before the transcribed conversation. It does appear that the technician understood the customer’s issue as he did a “bandaid” fix on the unit, as there is now a proper “20 degree difference.” The problem diagnosis is fair as clearly the technician inquired and understood the customer’s issue, even if it wasn’t included in the transcription.'
    },
    {
      id: 'solution',
      title: 'Solution Explanation',
      icon: '💡',
      summary: 'Detailed presentation of equipment options',
      rating: 'Good',
      analysis: 'Due to the nature of the audio recording being a follow up conversation, the highlighted solution section is similar to that of the problem diagnosis. The “solution” to the problem was a bandaid fix in keeping the unit running and improving efficiency for the next 2 months. The technician clearly explained that a long lasting solution will consist of a new furnace, new coil, and a new condenser.'
    },
    {
      id: 'upsell',
      title: 'Upsell Attempts',
      icon: '📈',
      summary: 'Multiple equipment upgrades and premium options',
      rating: 'Excellent',
      analysis: 'The technician did an excellent job of making upsell attempts. The technician offered more profitable equipment options such as the heat pump over the standard furnace, a newer and more expensive nest thermostat, and upgrades that would allow the homeowner to past a HERS test. '
    },
    {
      id: 'maintenance',
      title: 'Maintenance Plan',
      icon: '🔧',
      summary: 'Additional services like duct sealing and HERS testing',
      rating: 'Good',
      analysis: 'The technician offered a 10 year maintenance plan to cover maintenance and parts for the new heat pump system, matching the manufacturer warranty. The section was mentioned very briefly and there was a missed opportunity for a better sales pitch for the maintenance plans, although the performed one was good.'
    },
    {
      id: 'closing',
      title: 'Closing & Thank You',
      icon: '✨',
      summary: 'Payment discussion and next steps',
      rating: 'Poor',
      analysis: 'The technician just concluded the call by taking payment for the small maintenance performed that day. The transcript did not conclude the technician thanking the customer and finishing courteously. It’s possible this part was not included in the recording, but due to its absence, the closing and thank you are of poor quality.'
    },
    {
      id: 'sales-insights',
      title: 'Sales Insights',
      icon: '💼',
      summary: 'Overall opportunities and performance analysis',
      rating: 'Analysis',
      analysis: 'In the call, the technician did a great job of recommending a new system for the customer when it appears the technician was called to service a broken unit. The Sale signals picked up on: Technician offered a new system when he was originally called to repair a broken unit. The technician offered a new grill that “reduces noise by 20%” after the customer said that they did not like the noise of their current unit. Sales signals missed: The customer asked about relocating the unit to the attic or garage, but the technician did not emphasize the benefits to this solution first and instead first expressed concerns with these options. While the technician did later explain the packages he has for these options, he should have been ready to capitalize on the customers on signal for an upsell.' 
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`transcript-${sectionId}`);
    if (element && transcriptRef.current) {
      const container = transcriptRef.current;
      const elementTop = element.offsetTop - container.offsetTop;
      container.scrollTo({
        top: elementTop - 20,
        behavior: 'smooth'
      });
    }
  };

  const toggleExpanded = (sectionId, event) => {
    event.stopPropagation();
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getRatingColor = (rating) => {
    switch(rating) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Poor' : return 'text-red-600'
      case 'Fair' : return 'text-orange-600'
      default: return 'text-gray-600';
    }
  };

    return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-900 mb-10">
          Service Call Analysis
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Transcript */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-900">Call Transcript</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
            <div 
              ref={transcriptRef}
              className="h-[calc(100vh-250px)] overflow-y-auto space-y-4 pr-2"
            >
              {transcriptSections.map((section, index) => (
                <div 
                  key={index}
                  id={`transcript-${section.id}`}
                  className={`p-3 rounded-lg transition-colors ${
                    activeSection === section.id 
                      ? 'bg-blue-100 border-l-4 border-blue-600' 
                      : 'bg-gray-50'
                  }`}
                >
                  {section.title && (
                    <h3 className="text-lg font-bold text-blue-800 mb-2">
                      {section.title}
                    </h3>
                  )}
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-gray-500 font-mono">{section.time}</span>
                    <div className="flex-1">
                      <span className={`font-semibold ${
                        section.speaker === 'Customer' 
                          ? 'text-blue-700' 
                          : 'text-gray-700'
                      }`}>
                        {section.speaker}:
                      </span>
                      <span className="ml-2 text-gray-800">{section.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Right side - Analysis Categories */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-900">Analysis Categories</h2>
            {analysisCategories.map((category) => (
              <div key={category.id} className="w-full">
                <button
                  onClick={() => scrollToSection(category.id)}
                  className={`w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-4 border-2 text-left ${
                    activeSection === category.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-blue-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-blue-900">
                          {category.title}
                        </h3>
                        <p className="text-base text-gray-600 mt-1">
                          {category.summary}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-semibold ${getRatingColor(category.rating)}`}>
                        {category.rating}
                      </span>
                      <button
                        onClick={(e) => toggleExpanded(category.id, e)}
                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                      >
                        <ChevronRight 
                          className={`text-blue-600 transition-transform ${
                            expandedSections.includes(category.id) ? 'rotate-90' : ''
                          }`} 
                          size={20} 
                        />
                      </button>
                    </div>
                  </div>
                </button>
                {expandedSections.includes(category.id) && (
                  <div className="bg-white border-2 border-blue-200 border-t-0 rounded-b-lg p-5 shadow-md">
                    <h4 className="font-semibold text-blue-900 mb-2 text-lg">Detailed Analysis:</h4>
                    <p className="text-gray-700 text-base leading-relaxed">
                      {category.analysis}
                    </p>
                  </div>
                )}
              </div>
            ))}
            
            {/* Call Type Indicator */}
            <div className="bg-blue-600 text-white rounded-lg shadow-md p-5 mt-6">
              <h3 className="text-xl font-bold mb-2">Call Type Identified</h3>
              <p className="text-xl">🔧 HVAC System Replacement - Sales Call</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCallAnalysis;