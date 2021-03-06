<span ng-show="!engine.ksprfs.ksprfs_mm_duplicate">@</span><span ng-show="engine.ksprfs.ksprfs_mm_duplicate">+</span>PART[{{engine.ksprfs.ksprfs_engine_id}}]:<span ng-show="engine.ksprfs.ksprfs_mm_duplicate">BEFORE</span><span ng-show="!engine.ksprfs.ksprfs_mm_duplicate">FOR</span>[RealFuels_StockEngines]<span ng-show="engine.ksprfs.ksprfs_mm_has">:HAS[{{engine.ksprfs.ksprfs_mm_has}}]</span><span ng-show="engine.ksprfs.ksprfs_mm_needs">:NEEDS[{{engine.ksprfs.ksprfs_mm_needs}}]</span> //<span ng-bind-html="engine.title.rendered"></span>
{
  <span ng-show="engine.ksprfs.ksprfs_mm_duplicate">@name = {{engine.ksprfs.ksprfs_mm_duplicate}}</span><span ng-show="engine.ksprfs.ksprfs_engine_name">
  @title = {{engine.ksprfs.ksprfs_engine_name}}</span>
  @mass = {{math.round((engine.ksprfs.ksprfs_engine_mass+engine.ksprfs.ksprfs_engine_extra_mass)*1000)/1000}}
  @cost = {{engine.ksprfs.engineCost}}
  %entryCost = {{engine.ksprfs.engineEntryCost}}
  <span ng-show="engine.ksprfs.ksprfs_type !== 'rcs'">@maxTemp = {{engine.ksprfs.max_heat}}</span>
  <span ng-show="engine.ksprfs.ksprfs_engine_desc">@description = {{engine.ksprfs.ksprfs_engine_desc}}</span>
  {{engine.ksprfs.ksprfs_engine_patch}}
  @MODULE[<span ng-show="engine.ksprfs.ksprfs_type !== 'rcs'">ModuleEngine*</span><span ng-show="engine.ksprfs.ksprfs_type === 'rcs'">ModuleRCS*</span>]
  {
    <span ng-show="engine.ksprfs.ksprfs_type !== 'rcs'">@name = ModuleEnginesRF
    @maxThrust = {{math.round(engine.ksprfs.ksprfs_engine_thrust * getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture).ksprfs.ksprfs_mixture_thrust_mult)}}</span><span ng-show="engine.ksprfs.ksprfs_type === 'rcs'">@name = ModuleRCSFX
    @thrusterPower = {{math.round(1000 * engine.ksprfs.ksprfs_engine_thrust * getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture).ksprfs.ksprfs_mixture_thrust_mult) / 1000}}</span>
    @heatProduction = {{math.round(engine.ksprfs.engine_heat)}}
    @atmosphereCurve
    {
      @key,0 = 0 {{math.round(engine.ksprfs.resultIspV * getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture).ksprfs.ksprfs_mixture_ispv_mult)}}
      @key,1 = 1 {{math.round(engine.ksprfs.resultIspSL * getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture).ksprfs.ksprfs_mixture_ispsl_mult)}}
    }
    !PROPELLANT[LiquidFuel] {}
    !PROPELLANT[Oxidizer] {}
    !PROPELLANT[MonoPropellant] {}
    PROPELLANT
    {
      name = {{getFuel(getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture)).title.rendered}}
      ratio = {{engine.ksprfs.ksprfs_engine_configs[0].fuelRatio | number:6}}
      DrawGauge = True
      <span ng-show="engine.ksprfs.ksprfs_type !== 'solid' && engine.ksprfs.ksprfs_type !== 'solid-plus'">%ResourceFlowMode = {{engine.ksprfs.ksprfs_engine_flow}}</span>
    }
    <span ng-show="getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture).ksprfs.ksprfs_mixture_oxidizer">PROPELLANT
    {
      name = {{getOxidizer(getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture)).title.rendered}}
      ratio = {{engine.ksprfs.ksprfs_engine_configs[0].oxyRatio | number:6}}
      %ResourceFlowMode = {{engine.ksprfs.ksprfs_engine_flow}}
    }</span>
  }
  <span ng-show="engine.ksprfs.ksprfs_engine_vectoring_override"><span ng-show="engine.ksprfs.ksprfs_engine_vectoring_exists">MODULE
  {
    name = ModuleGimbal
    gimbalTransformName = thrustTransform
    gimbalRange = {{engine.ksprfs.ksprfs_engine_vectoring}}
  }</span><span ng-show="!engine.ksprfs.ksprfs_engine_vectoring_exists">@MODULE[ModuleGimbal]
  {
    @gimbalRange = {{engine.ksprfs.ksprfs_engine_vectoring}}
  }</span></span>
  MODULE
  {
    name = <span ng-show="!engine.ksprfs.ksprfs_engine_bimodal">ModuleEngineConfigs</span><span ng-show="engine.ksprfs.ksprfs_engine_bimodal">ModuleHybridEngine</span>
    type = <span ng-show="engine.ksprfs.ksprfs_type !== 'rcs'">ModuleEnginesRF</span><span ng-show="engine.ksprfs.ksprfs_type === 'rcs'">ModuleRCSFX</span>
    techLevel = {{displayTechLevel(engine)}}
    origTechLevel = {{displayTechLevel(engine)}}
    engineType = {{engineTypeConfigs[engine.ksprfs.ksprfs_type][0]}}
    origMass = {{engine.ksprfs.ksprfs_engine_mass+engine.ksprfs.ksprfs_engine_extra_mass}}
    configuration = {{engine.ksprfs.ksprfs_engine_configs[0].title.rendered}}
    modded = false
    <span ng-repeat="config in engine.ksprfs.ksprfs_engine_configs">
    CONFIG
    {
      name = {{config.title.rendered}}
      <span ng-show="engine.ksprfs.ksprfs_type !== 'rcs'">maxThrust = {{math.round(engine.ksprfs.ksprfs_engine_thrust * getMixture(config.config_mixture).ksprfs.ksprfs_mixture_thrust_mult)}}</span><span ng-show="engine.ksprfs.ksprfs_type === 'rcs'">thrusterPower = {{math.round(1000 * engine.ksprfs.ksprfs_engine_thrust * getMixture(config.config_mixture).ksprfs.ksprfs_mixture_thrust_mult) / 1000}}</span>
      heatProduction = {{engine.ksprfs.engine_heat | number:0}}
      PROPELLANT
      {
        name = {{getFuel(getMixture(config.config_mixture)).title.rendered}}
        ratio = {{config.fuelRatio}}
        DrawGauge = True
        <span ng-show="engine.ksprfs.ksprfs_type !== 'solid' && engine.ksprfs.ksprfs_type !== 'solid-plus'">%ResourceFlowMode = {{engine.ksprfs.ksprfs_engine_flow}}</span>
      }<span ng-show="getMixture(config.config_mixture).ksprfs.ksprfs_mixture_oxidizer">
      PROPELLANT
      {
        name = {{getOxidizer(getMixture(config.config_mixture)).title.rendered}}
        ratio = {{config.oxyRatio}}
        %ResourceFlowMode = {{engine.ksprfs.ksprfs_engine_flow}}
      }</span><span ng-show="engine.ksprfs.ksprfs_type === 'nuclear-thermal'">
      PROPELLANT
      {
        name = EnrichedUranium
        ratio = 0.00000000001
      }</span>
      IspSL = {{config.ispSL_mult | number:4}}
      IspV = {{config.ispV_mult | number:4}}
      throttle = {{engine.finalThrottle}}
      <span ng-show="engine.ksprfs.ksprfs_engine_ignition_mode != 0">ModuleEngineIgnitor
      {
        ignitionsAvailable = {{config.ignitions}}
        useUllageSimulation = {{config.ullage}}
        autoIgnitionTemperature = 800
        <span ng-show="config.ullage">ignitorType = Electric
        IGNITOR_RESOURCE
        {
          name = ElectricCharge
          amount = {{engine.ksprfs.ksprfs_engine_thrust/100}}
        }</span>
      }</span>
      <span ng-show="(config.config_thrust_curve != '0' && config.config_thrust_curve)">curveResource = {{getFuel(getMixture(config.config_mixture)).title.rendered}}
      thrustCurve
      {
        {{thrustCurves[config.config_thrust_curve]}}{{config.config_custom_curve}}
      }</span>
      {{engine.ksprfs.ksprfs_engine_config_patch}}
    }</span>
  }
  <span ng-show="engine.ksprfs.ksprfs_engine_ignition_mode != 0">!MODULE[ModuleEngineIgnitor] {}
  ModuleEngineIgnitor
  {
    ignitionsAvailable = {{engine.ksprfs.ksprfs_engine_configs[0].ignitions}}
    autoIgnitionTemperature = 800
    useUllageSimulation = {{engine.ksprfs.ksprfs_engine_configs[0].ullage}}
    <span ng-show="config.ullage">ignitorType = Electric
    IGNITOR_RESOURCE
    {
      name = ElectricCharge
      amount = {{engine.ksprfs.ksprfs_engine_thrust/100}}
    }</span>
  }</span>
  <span ng-show="engine.ksprfs.ksprfs_engine_mft && engine.ksprfs.ksprfs_engine_mft_volume">
  !RESOURCE[LiquidFuel] {}
  !RESOURCE[Oxidizer] {}
  !RESOURCE[MonoPropellant] {}
  !RESOURCE[SolidFuel] {}
  !RESOURCE[XenonGas] {}
  MODULE
  {
    name = ModuleFuelTanks
    basemass = -1
    volume = {{engine.ksprfs.ksprfs_engine_mft_volume}}
    type = {{engine.ksprfs.ksprfs_engine_mft}}
    // dedicated = {{engine.ksprfs.ksprfs_engine_dedicated}}
    TANK
    {
     name = {{getFuel(getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture)).title.rendered}}
     amount = full
     maxAmount = {{engine.ksprfs.ksprfs_engine_configs[0].fuelRatio | number:6}}%
    }
    <span ng-show="getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture).ksprfs.ksprfs_mixture_oxidizer">TANK
    {
     name = {{getOxidizer(getMixture(engine.ksprfs.ksprfs_engine_configs[0].config_mixture)).title.rendered}}
     amount = full
     maxAmount = {{engine.ksprfs.ksprfs_engine_configs[0].oxyRatio | number:6}}%
    }</span>
  }
  </span>
  <span ng-show="engine.ksprfs.ksprfs_type === 'nuclear-thermal'">!MODULE[ModuleAlternator] {}
  !MODULE[ModuleGenerator] {}
  !RESOURCE[EnrichedUranium] {}
  !RESOURCE[DepletedUranium] {}
  MODULE
  {
    name = ModuleAlternator
    OUTPUT_RESOURCE
    {
      name = EnrichedUranium
      rate = -{{engine.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
    OUTPUT_RESOURCE
    {
      name = DepletedUranium
      rate = {{engine.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
    OUTPUT_RESOURCE
    {
      name = ElectricCharge
      rate = {{engine.ksprfs.ksprfs_engine_thrust/20}}
    }
  }
  MODULE
  {
    name = ModuleGenerator
    isAlwaysActive = true
    OUTPUT_RESOURCE
    {
      name = ElectricCharge
      rate = {{engine.ksprfs.ksprfs_engine_thrust/40}}
    }
    OUTPUT_RESOURCE
    {
      name = DepletedUranium
      rate = {{engine.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
    INPUT_RESOURCE
    {
      name = EnrichedUranium
      rate = {{engine.ksprfs.ksprfs_engine_thrust/12}}E-18
    }
  }
  RESOURCE
  {
    name = EnrichedUranium
    amount = {{engine.ksprfs.ksprfs_engine_thrust/12}}
    maxAmount = {{engine.ksprfs.ksprfs_engine_thrust/12}}
  }
  RESOURCE
  {
    name = DepletedUranium
    amount = 0
    maxAmount = {{engine.ksprfs.ksprfs_engine_thrust/12}}
  }
  </span>
}
