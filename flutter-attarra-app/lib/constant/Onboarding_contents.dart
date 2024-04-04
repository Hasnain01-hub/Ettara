class OnboardingContents {
  final String title;
  final String image;
  final String desc;

  OnboardingContents({
    required this.title,
    required this.image,
    required this.desc,
  });
}

List<OnboardingContents> contents = [
  OnboardingContents(
    title: "Track Your work and get the result",
    image: "images/image1.png",
    desc: "Remember to keep track of your professional accomplishments.",
  ),
  OnboardingContents(
    title: "Stay organized with team",
    image: "images/image2.png",
    desc: "But understanding the contributions our ",
  ),
  OnboardingContents(
    title: "Get notified when work happens",
    image: "images/image3.png",
    desc:
        "Take control of notifications, collaborate live or on your own time.",
  ),
];
